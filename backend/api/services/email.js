const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
// const QRCode = require('qrcode');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const svgToImg = require('svg-to-img');

const prisma = new PrismaClient();

// async function convertSvgToPngAndSave(svgData, pngFileName) {
//   try {
//     // Convert SVG to PNG
//     const pngBuffer = await svgToImg.from(svgData).toPng();

//     // Create the "qrCodes" folder if it doesn't exist
//     const qrCodesFolder = path.join(__dirname, 'qrCodes');
//     if (!fs.existsSync(qrCodesFolder)) {
//       fs.mkdirSync(qrCodesFolder);
//     }

//     // Save the PNG file in the "qrCodes" folder
//     const pngFilePath = path.join(qrCodesFolder, `${pngFileName}.png`);
//     fs.writeFileSync(pngFilePath, pngBuffer);

//     console.log(`SVG converted and PNG saved to: ${pngFilePath}`);

//     return pngFilePath;
//   } catch (error) {
//     console.error('Error converting SVG to PNG:', error.message);
//   }
// }

const transporter = nodemailer.createTransport({
  // host: 'binarymarvels.com',
  // secure: true,
  // port: 465,
  service: 'gmail',
  auth: {
    user: 'admin@padimedical.com',
    pass: 'uibdmtvomxpzmhuo',
  },
});

exports.emailSender = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: 'admin@padimedical.com', // sender address
      to,
      subject,
      text,
      html,
    });
    console.log('info====>>>', info);
    return info;
  } catch (err) {
    console.log('error', err);
    return err;
    // return res.status(500).json({
    //   message: err,
    // });
  }
};

exports.reciptEmailHtml = async ({ eventPaymentId }) => {
  const eventPayment = await prisma.eventPayment.findFirst({
    where: {
      id: eventPaymentId,
    },
    include: {
      event: true,
      EventRegistration: true,
      user: true,
    },
  });

  if (!eventPayment) {
    return res.status(404).json({
      message: 'Event payment not found',
    });
  }

  // QRCode.toString(
  //   process.env.FRONTEND_URL +
  //     '/event-verification/?id=' +
  //     eventPayment?.id +
  //     '?name=' +
  //     eventPayment?.EventRegistration?.fullName +
  //     '&email=' +
  //     eventPayment?.user?.email +
  //     '&eventName=' +
  //     eventPayment?.event?.title +
  //     '&registrationDate=' +
  //     eventPayment?.event?.createdAt +
  //     '&practicingNumber=' +
  //     eventPayment?.EventRegistration?.practicingNumber,
  //   {
  //     errorCorrectionLevel: 'H',
  //     width: '100px',
  //     type: 'svg',
  //   },
  //   function (err, data) {
  //     if (err) throw err;
  //     QRCodeSVG = data;
  //   },
  // );

  // const image = await convertSvgToPngAndSave(QRCodeSVG, 'qrrrrr');
  // if (image) {
  //   console.log('Base64 representation of SVG:', image);
  // }
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      /* Inline styles go here */
      /* Make sure to inline all the styles used in the component */
    </style>
  </head>
  
  <body>
    <div style="width: 100%; display: flex; justify-content: center; margin-bottom: 4px;">
      <div style="border: 1px solid #ccc; border-radius: 8px; max-width: 400px; background-color: #dbfafc">
        <div style="padding: 16px;">
          <h2 style="text-align: center;">${eventPayment?.event?.title}</h2>
          <div style="text-align: left;">
            <div style="display: flex;align-items: center; margin-top: 16px;">
              <div style="border-radius: 1px;width: 24px; height: 24px; padding: 1px; margin-top: 4px;">
                <span style="font-size: 20px; margin-left: 1px;"><img src="${
                  process.env.FRONTEND_URL
                }/images/user-emoji.png" width="20px" height="20px" alt="☺"></span>
              </div>
              <div style="margin-left: 8px; margin-top: 8px;">${
                eventPayment?.EventRegistration?.fullName
              }</div>
            </div>
            <div style="display: flex;align-items: center; margin-top: 16px;">
              <span style="font-size: 20px;">&#128339;</span>
              <div style="margin-left: 8px; margin-top: 8px;">
              ${moment(eventPayment?.event?.scheduleStart).format('h:mma')}
                &nbsp;&nbsp;-&nbsp;&nbsp;
                ${moment(eventPayment?.event?.scheduleEnd).format('h:mma')}
            </div>
            </div>
            <div style="display: flex;align-items: center; margin-top: 16px;">
              <span style="font-size: 20px;">&#128197;</span>
              <div style="margin-left: 8px; margin-top: 8px;"> ${moment(
                eventPayment?.event?.scheduleStart,
              ).format('D MMMM, YYYY')}
              &nbsp;&nbsp;-&nbsp;&nbsp;
              ${moment(eventPayment?.event?.scheduleEnd).format('D MMMM, YYYY')}
  </div>
            </div>
            <div style="display: flex;align-items: center; margin-top: 16px;">
              <span style="font-size: 20px;">&#128204;</span>
              <div style="margin-left: 8px;">${
                eventPayment?.event?.location
              }</div>
            </div>
            <br><br>
          </div>
        </div>
        <div style="width: 100%; border: 1px solid #9c9c9c; background-color: #f0f0f0; border-radius: 8px; display: flex;">
          <div style="width: 50%; padding: 8px; padding-top: 16px; display: flex; align-items: center;">
            <span style="font-size: 20px;">&#9993;</span>
            <div style="font-size: 10px; margin-left: 8px;">
              <div>anis@longemend.com</div>
              <div>elyia@longemend.com</div>
            </div>
          </div>
          <div style="width: 50%; border-left: 1px solid #9c9c9c; height: 100%; padding: 8px; padding-top: 16px; display: flex; align-items: center;">
            <span style="font-size: 20px;">&#128222;</span>
            <div style="font-size: 10px; margin-left: 8px;">
              <div>+60389592593 (Anis/Elyia)</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
    <a href="${
      process.env.FRONTEND_URL
    }/dashboard?tab=Event-Tickets">Back to User Dashboard</a>
    </div>
  </body>
  
  </html>
  `;
};

exports.approvedAccountHtml = `
<body>
<div>
  <div style="color: gray">
    <h1 style="margin-left:45%">PARU</h1>
  </div>
  <br />
  <div style="margin-left:15%; height: 2px; width: 70%; background-color: lightgray"></div>
  <br />
  <br />
  <br />

  <div style="font-size: 24px; text-align: center">
    Thank you for signing up to PARU.
    <br />
    <br />

    Please login to
    <a href="https://paru.longemed.com">https://paru.longemed.com</a>
    to continue browsing.
    <br />
    <br />
    <br />

    <div style="cursor: pointer;">
    <a href="https://paru.longemed.com/login" style="cursor: pointer;">
      <button
        style="
          background-color: lightgray;
          border: none;
          border-radius: 10px;
          padding: 15px 25px;
          cursor: pointer;
        "
      >
        Login to our Site
      </button>
    </a>
  </div>
  </div>
</div>
</body>
`;
