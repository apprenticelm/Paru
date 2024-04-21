const { PrismaClient, PaymentStatus } = require('@prisma/client');
const { reciptEmailHtml, emailSender } = require('../services/email');
const { v4: uuidv4 } = require('uuid');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const prisma = new PrismaClient();

exports.createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success.html`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel.html`,
    });

    return {
      session,
    };
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.createCheckoutIntent = async (req, res) => {
  try {
    const {
      eventId,
      registrationFor,
      fullName,
      email,
      telephone,
      nationality,
      insituition,
      department,
      practicingNumber,
      couponId,
    } = req.body;

    if (
      !registrationFor ||
      !fullName ||
      !email ||
      !telephone ||
      !nationality ||
      !insituition ||
      !department ||
      !practicingNumber
    ) {
      return res.status(409).json({
        message:
          'enter eventId, registrationFor, fullName, email, telephone, nationality, insituition, department, practicingNumber!',
      });
    }
    let coupon;
    if (couponId) {
      coupon = await prisma.coupon.findFirst({
        where: {
          id: +couponId,
          deleted: false,
        },
      });

      if (!coupon) {
        return res.status(404).json({
          message: 'Invalid coupon Code!',
        });
      }
    }

    const event = await prisma.event.findFirst({
      where: {
        id: +eventId,
        deleted: false,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: 'Event not found!',
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: coupon
        ? (event.price - coupon?.discount) * 100
        : event.price * 100,
      currency: 'myr',
      payment_method_types: ['card', 'fpx'],
      // payment_method_types: ['card'],
      metadata: {
        eventId,
        registrationFor,
        fullName,
        email,
        telephone,
        nationality,
        insituition,
        department,
        practicingNumber,
      },
    });

    await prisma.eventPayment.create({
      data: {
        eventId: +eventId,
        status: 'PENDING',
        paymentIntentId: paymentIntent.id,
        paymentIntentClientSecret: paymentIntent.client_secret,
        userId: req.userData.id,
      },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({
      message: err,
    });
  }
};

// Payment is successful
exports.updateEventPayment = async (req, res) => {
  try {
    const { paymentIntentId, paymentIntentClientSecret, eventId } = req.body;

    const eventPayment = await prisma.eventPayment.findFirst({
      where: {
        paymentIntentId,
        paymentIntentClientSecret,
        eventId: +eventId,
        userId: req.userData.id,
        NOT: {
          status: 'SUCCESS',
        },
      },
    });

    if (!eventPayment) {
      return res.status(404).json({
        message: 'Event payment not found',
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // console.log(paymentIntent?.metadata);
      const {
        registrationFor,
        fullName,
        email,
        telephone,
        nationality,
        insituition,
        department,
        practicingNumber,
      } = paymentIntent?.metadata;

      await prisma.eventPayment.update({
        where: {
          id: eventPayment.id,
        },
        data: {
          status: 'SUCCESS',
          EventRegistration: {
            create: {
              registrationFor,
              fullName,
              email,
              telephone,
              nationality,
              insituition,
              department,
              practicingNumber,
            },
          },
        },
      });

      const htmlRecipt = await reciptEmailHtml({
        eventPaymentId: eventPayment?.id,
      });

      await emailSender({
        to: paymentIntent?.metadata?.email,
        html: htmlRecipt,
        subject: 'Your Event Registration',
      });
    }

    return res.status(200).json({
      paymentIntent,
    });
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.createFreeTicketRegistration = async (req, res) => {
  try {
    const { id } = req?.userData;

    const {
      eventId,
      registrationFor,
      fullName,
      email,
      telephone,
      nationality,
      insituition,
      department,
      practicingNumber,
      couponId,
    } = req.body;

    if (
      (!eventId,
      !registrationFor ||
        !fullName ||
        !email ||
        !telephone ||
        !nationality ||
        !insituition ||
        !department ||
        !practicingNumber)
    ) {
      return res.status(409).json({
        message:
          'enter eventId, registrationFor, fullName, email, telephone, nationality, insituition, department, practicingNumber!',
      });
    }

    if (couponId) {
      const coupon = await prisma.coupon.findFirst({
        where: {
          id: +couponId,
          deleted: false,
        },
      });

      if (!coupon) {
        return res.status(404).json({
          message: 'Coupon not found',
        });
      }
    }

    const freeRegistration = await prisma.eventRegistration.create({
      data: {
        registrationFor,
        fullName,
        email,
        telephone,
        nationality,
        insituition,
        department,
        practicingNumber,
        ...(couponId && {
          coupon: {
            connect: {
              id: +couponId,
            },
          },
        }),
        EventPayment: {
          create: {
            event: {
              connect: {
                id: eventId,
              },
            },
            user: {
              connect: {
                id,
              },
            },
            paymentIntentId: uuidv4(),
            paymentIntentClientSecret: uuidv4(),
            status: PaymentStatus.SUCCESS,
          },
        },
      },
      include: {
        EventPayment: true,
      },
    });

    const htmlRecipt = await reciptEmailHtml({
      eventPaymentId: freeRegistration?.EventPayment?.id,
    });

    await emailSender({
      to: email,
      html: htmlRecipt,
      subject: 'Your Event Registration',
    });

    return res.status(200).json({
      freeRegistration,
    });
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.paymentDetails = async (req, res) => {
  const { intentId, intentSecret, isFree } = req?.query;
  try {
    const paymentDetails = await prisma.eventPayment.findFirst({
      where: {
        status: PaymentStatus.SUCCESS,
        paymentIntentId: intentId,
        paymentIntentClientSecret: intentSecret,
      },
      include: {
        event: true,
        EventRegistration: true,
        user: true,
      },
    });

    if (!paymentDetails) {
      return res.status(404).json({
        message: 'Payment details are not found!',
      });
    }
    if (!isFree) {
      const paymentIntent = await stripe.paymentIntents.retrieve(intentId);

      if (!paymentIntent || paymentIntent?.status !== 'succeeded') {
        // Register user to event
        return res.status(404).json({
          message: 'Invalid intent Id or secret!',
        });
      }
    }

    return res.status(200).json({
      paymentDetails,
    });
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.allPaymentDetails = async (req, res) => {
  const { id } = req?.userData;

  try {
    const paymentDetails = await prisma.eventPayment.findMany({
      where: {
        status: PaymentStatus.SUCCESS,
        user: {
          id,
          deleted: false,
        },
      },
      include: {
        event: true,
        EventRegistration: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!paymentDetails) {
      return res.status(404).json({
        message: 'Payment details are not found!',
      });
    }

    return res.status(200).json({
      paymentDetails,
    });
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.paymentVerification = async (req, res) => {
  const { id } = req?.params;

  console.log(req?.params);

  try {
    const paymentDetails = await prisma.eventPayment.findFirst({
      where: {
        id,
      },
      include: {
        event: true,
        EventRegistration: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      paymentDetails,
    });
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({
      message: err,
    });
  }
};
