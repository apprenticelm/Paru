const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.addCoupon = async (req, res) => {
  const { code, discount } = req.body;

  // check both fields are present
  if (!code || !discount) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  // check is coupon already exist
  const couponExist = await prisma.coupon.findFirst({
    where: {
      code,
      deleted: false,
    },
  });

  if (couponExist) {
    return res.status(400).json({
      message: 'Code already exist',
    });
  }

  try {
    const couponCreated = await prisma.coupon.create({
      data: {
        code,
        discount: +discount,
      },
    });

    return res.status(200).json({
      coupon: couponCreated,
    });
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({
      message: err,
    });
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany({
      where: {
        deleted: false,
      },
    });

    return res.status(200).json({
      coupons,
    });
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({
      err,
    });
  }
};

exports.deleteCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    const couponDeleted = await prisma.coupon.update({
      where: {
        id: Number(id),
      },
      data: {
        deleted: true,
      },
    });

    return res.status(200).json({
      couponDeleted,
    });
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({
      err,
    });
  }
};

exports.getCouponById = async (req, res) => {
  const { id } = req.params;

  try {
    const coupon = await prisma.coupon.findUnique({
      where: {
        id: Number(id),
        deleted: false,
      },
    });

    return res.status(200).json({
      coupon,
    });
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({
      err,
    });
  }
};

exports.getCouponByCode = async (req, res) => {
  const { code } = req.params;

  try {
    const coupon = await prisma.coupon.findFirst({
      where: {
        code,
        deleted: false,
      },
    });

    // if not valid
    if (!coupon) {
      return res.status(400).json({
        message: 'Invalid coupon code',
      });
    }

    return res.status(200).json({
      coupon,
    });
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({
      err,
    });
  }
};
