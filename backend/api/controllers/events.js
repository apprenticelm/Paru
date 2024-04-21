const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const fs = require('fs');
const { emailSender } = require('../services/email');

// --------------------------------USER---------------------------------

exports.create = async (req, res) => {
  try {
    const { id } = req?.userData;
    const {
      title,
      modules,
      scheduleStart,
      scheduleEnd,
      location,
      instructor,
      capacity,
      price,
      registrationStart,
      registrationEnd,
      speaker,
    } = req.body;

    if (
      !title ||
      !modules ||
      !scheduleStart ||
      !scheduleEnd ||
      !location ||
      !instructor ||
      !capacity ||
      !price === null ||
      !price === undefined ||
      !registrationStart ||
      !registrationEnd
    ) {
      return res.status(409).json({
        message:
          'enter title, modules, scheduleStart, scheduleEnd, location, instructor, capacity, price, registrationStart, registrationEnd,!',
      });
    }

    const eventCreation = await prisma.event.create({
      data: {
        title,
        modules,
        scheduleStart,
        scheduleEnd,
        location,
        instructor,
        speaker: speaker || '',
        capacity,
        price,
        registrationStart,
        registrationEnd,
        userId: id,
      },
    });

    return res.status(200).json({ eventCreation });
  } catch (err) {
    console.log('error', err);
    return res.status(401).json({
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req?.userData;
    const { eventId } = req?.params;
    console.log('eventId', eventId);

    const isAdmin = await prisma.user.findFirst({
      where: {
        id,
        role: 'admin',
      },
    });
    if (!isAdmin) {
      const validEvent = await prisma.event.findFirst({
        where: {
          id: +eventId,
          user: {
            id,
          },
        },
      });

      if (!validEvent) {
        return res.status(401).json({
          message: 'You do not have permission to Edit this!',
        });
      }
    }

    const {
      title,
      modules,
      scheduleStart,
      scheduleEnd,
      location,
      instructor,
      capacity,
      price,
      registrationStart,
      registrationEnd,
      speaker,
    } = req.body;

    const eventCreation = await prisma.event.update({
      where: {
        id: +eventId,
      },
      data: {
        title,
        modules,
        scheduleStart,
        scheduleEnd,
        location,
        instructor,
        speaker: speaker || '',
        capacity,
        price,
        registrationStart,
        registrationEnd,
      },
    });

    return res.status(200).json({ eventCreation });
  } catch (err) {
    console.log('error', err);
    return res.status(401).json({
      message: err,
    });
  }
};

exports.editAdditionalEvent = async (req, res) => {
  try {
    const { id } = req?.userData;
    const { eventId } = req?.params;
    let images = req?.files?.materialImages;
    let documents = req?.files?.materialDocuments;
    let videos = req?.files?.materialVideos;

    if (!Array.isArray(images) && images) {
      images = [images];
    }
    if (!Array.isArray(documents) && documents) {
      documents = [documents];
    }
    if (!Array.isArray(videos) && videos) {
      videos = [videos];
    }

    const isAdmin = await prisma.user.findFirst({
      where: {
        id,
        role: 'admin',
      },
    });
    if (!isAdmin) {
      const validEvent = await prisma.event.findFirst({
        where: {
          id: +eventId,
          user: {
            id,
          },
        },
      });

      if (!validEvent) {
        return res.status(401).json({
          message: 'You do not have permission to Edit this!',
        });
      }
    }

    const {
      details,
      learn,
      requirements,
      advantages,
      documentUrl,
      ImageUrl,
      links,
    } = req.body;

    const updateEventAdditional = await prisma.eventAdditional.update({
      where: {
        eventId: +eventId,
      },
      data: {
        details,
        learn,
        requirements,
        advantages,
        documentUrl,
        MaterialLinks: links,
        ImageUrl,
        ...(images?.length > 0 && {
          MaterialImages: {
            create: images?.map((image) => {
              return {
                path: image?.path,
                name: image?.name,
                size: image?.size,
                type: image?.type,
                fieldName: image?.fieldName,
                originalFilename: image?.originalFilename,
                headers: image?.headers,
              };
            }),
          },
        }),
        ...(documents?.length > 0 && {
          MaterialDocuments: {
            create: documents?.map((document) => {
              return {
                path: document?.path,
                name: document?.name,
                size: document?.size,
                type: document?.type,
                fieldName: document?.fieldName,
                originalFilename: document?.originalFilename,
                headers: document?.headers,
              };
            }),
          },
        }),
        ...(videos?.length > 0 && {
          MaterialVideos: {
            create: videos?.map((video) => {
              return {
                path: video?.path,
                name: video?.name,
                size: video?.size,
                type: video?.type,
                fieldName: video?.fieldName,
                originalFilename: video?.originalFilename,
                headers: video?.headers,
              };
            }),
          },
        }),
      },
    });

    return res.status(200).json({ updateEventAdditional });
  } catch (err) {
    console.log('error', err);
    return res.status(401).json({
      message: err,
    });
  }
};

exports.createAdditional = async (req, res) => {
  try {
    const { id } = req?.userData;
    const {
      details,
      learn,
      requirements,
      advantages,
      documentUrl,
      ImageUrl,
      eventId,
      links,
    } = req.body;

    console.log('body data', req.files);

    let images = req?.files?.materialImages;
    let documents = req?.files?.materialDocuments;
    let videos = req?.files?.materialVideos;

    // if single image recive then convert it to array
    if (!Array.isArray(images) && images) {
      images = [images];
    }
    if (!Array.isArray(documents) && documents) {
      documents = [documents];
    }
    if (!Array.isArray(videos) && videos) {
      videos = [videos];
    }

    if (!eventId) {
      return res.status(409).json({
        message: 'enter eventId!',
      });
    }

    const alreadyEvent = await prisma.eventAdditional.findFirst({
      where: {
        eventId: +eventId,
      },
    });

    if (alreadyEvent) {
      return res.status(409).json({
        message: 'Additional details already added with this event!',
      });
    }

    const eventAdditional = await prisma.eventAdditional.create({
      data: {
        details,
        learn,
        requirements,
        advantages,
        documentUrl,
        ImageUrl,
        eventId: +eventId,
        MaterialLinks: links,
        MaterialImages: {
          create: images?.map((image) => {
            return {
              path: image?.path,
              name: image?.name,
              size: image?.size,
              type: image?.type,
              fieldName: image?.fieldName,
              originalFilename: image?.originalFilename,
              headers: image?.headers,
            };
          }),
        },
        MaterialDocuments: {
          create: documents?.map((document) => {
            return {
              path: document?.path,
              name: document?.name,
              size: document?.size,
              type: document?.type,
              fieldName: document?.fieldName,
              originalFilename: document?.originalFilename,
              headers: document?.headers,
            };
          }),
        },
        MaterialVideos: {
          create: videos?.map((video) => {
            return {
              path: video?.path,
              name: video?.name,
              size: video?.size,
              type: video?.type,
              fieldName: video?.fieldName,
              originalFilename: video?.originalFilename,
              headers: video?.headers,
            };
          }),
        },
      },
    });

    return res.status(200).json({ eventAdditional });
  } catch (err) {
    console.log('error', err);
    return res.status(401).json({
      message: err,
    });
  }
};

exports.proceedWithPayment = async (req, res) => {
  try {
    const { email, eventId, fullName, registrationFor, documentUrl } = req.body;
    //const { id } = req?.userData;

    if (!email || !eventId || !fullName || !registrationFor || !documentUrl) {
      return res.status(409).json({
        message:
          'enter email, eventId, fullName, registrationFor, documentUrl!',
      });
    }

    const RegistrationEvent = await prisma.eventRegistration.create({
      data: {
        email,
        fullName,
        registrationFor,
        eventId: +eventId,
        documentUrl,
        //userId: id,
      },
    });

    const eventDetail = await prisma.event.findFirst({
      where: {
        id: +eventId,
      },
      // include: {
      //   user: true,
      // },
    });

    const documentFullURL = `${process.env.BACKEND_URL}/${documentUrl}`;

    await emailSender({
      html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 520px) {
  .u-row {
    width: 500px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 500px !important;
  }

}

@media (max-width: 520px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } </style>
  
  

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
    
  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <!--[if mso]><table width="100%"><tr><td><![endif]-->
    <h1 style="margin: 20px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 22px; font-weight: 400;"><span><span><strong>PARU</strong></span></span></h1>
  <!--[if mso]></td></tr></table><![endif]-->

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 16px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;"><span style="color: #7e8c8d; line-height: 22.4px;">Receipt for ${
      eventDetail?.title
    } is received</span></p>
<p style="line-height: 140%;"> </p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 15px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;"><span style="color: #7e8c8d; line-height: 19.6px;">Name: ${fullName}</span></p>
<p style="line-height: 140%;"><span style="color: #7e8c8d; line-height: 19.6px;">Email: ${email}</span></p>
  </div>

 <div style="padding-bottom:50px; padding-top:30px">
    <div style="line-height: 140%;"><span style="color: #7e8c8d; line-height: 19.6px;"> If you have not recived attachment please click here to open :</span> </div><a href="${documentFullURL.replace(
      /\\/g,
      '/',
    )}">${fullName}-payment-receipt.pdf</a>
    </div>
      </td>
    </tr>
  </tbody>
</table>
  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>

  `,
      subject: 'subject',
      text: 'text',
      to: ['admin@padimedical.com',email],
      attachments: [
        {
          filename: `${fullName}payment-receipt.pdf`,
          path: fs.createReadStream(`${documentUrl}`),
        },
        {
          filename: `${fullName}payment-receipt.pdf`,
          path: documentFullURL,
        },
      ],
    });

    return res.status(200).json({ RegistrationEvent });
  } catch (err) {
    console.log('error', err);
    return res.status(401).json({
      message: err,
    });
  }
};

exports.events = async (req, res) => {
  try {
    const nowDate = req.params?.nowDate;
    const { module, priceFrom, priceTo, instructor, search } = req.query;

    const [all, available, past] = await prisma.$transaction([
      prisma.event.findMany({
        where: {
          ...(search && {
            OR: [
              {
                title: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                modules: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }),
          ...(priceFrom &&
            priceFrom !== 'all' &&
            priceTo &&
            priceTo !== 'all' && {
              price: {
                lte: +priceTo,
                gte: +priceFrom,
              },
            }),
          ...(module &&
            module !== 'all' && {
              modules: module,
            }),
          ...(instructor &&
            instructor !== 'all' && {
              instructor: {
                contains: instructor,
                mode: 'insensitive',
              },
            }),
          deleted: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          EventCreationAdditional: true,
        },
      }),
      prisma.event.findMany({
        where: {
          ...(search && {
            OR: [
              {
                title: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                modules: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }),
          ...(priceFrom &&
            priceFrom !== 'all' &&
            priceTo &&
            priceTo !== 'all' && {
              price: {
                lte: +priceTo,
                gte: +priceFrom,
              },
            }),
          ...(module &&
            module !== 'all' && {
              modules: module,
            }),
          ...(instructor &&
            instructor !== 'all' && {
              instructor: {
                contains: instructor,
                mode: 'insensitive',
              },
            }),
          // registrationEnd: {
          //   gte: nowDate,
          // },
          scheduleEnd: {
            gte: nowDate,
          },
          deleted: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          EventCreationAdditional: true,
        },
      }),
      prisma.event.findMany({
        where: {
          ...(search && {
            OR: [
              {
                title: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                modules: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }),
          ...(priceFrom &&
            priceFrom !== 'all' &&
            priceTo &&
            priceTo !== 'all' && {
              price: {
                lte: +priceTo,
                gte: +priceFrom,
              },
            }),
          ...(module &&
            module !== 'all' && {
              modules: module,
            }),
          ...(instructor &&
            instructor !== 'all' && {
              instructor: {
                contains: instructor,
                mode: 'insensitive',
              },
            }),
          scheduleEnd: {
            lte: nowDate,
          },
          deleted: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          EventCreationAdditional: true,
        },
      }),
    ]);

    return res.status(200).json({
      all,
      available,
      past,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err,
    });
  }
};

exports.registration = async (req, res) => {
  try {
    const { id } = req?.userData;
    const {
      email,
      fullName,
      insituition,
      registrationFor,
      nationality,
      telephone,
      eventId,
      department,
      practicingNumber,
    } = req.body;

    if (
      !email ||
      !fullName ||
      !insituition ||
      !registrationFor ||
      !nationality ||
      !telephone ||
      !eventId ||
      !department ||
      !practicingNumber
    ) {
      return res.status(409).json({
        message:
          'enter email ,fullName, insituition, registrationFor, nationality, telephone, eventId, department, practicingNumber!',
      });
    }

    const RegistrationEvent = await prisma.eventRegistration.create({
      data: {
        email,
        fullName,
        insituition,
        registrationFor,
        nationality,
        telephone,
        eventId,
        department,
        practicingNumber,
        user: {
          connect: {
            id,
          },
        },
      },
    });

    return res.status(200).json({ RegistrationEvent });
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.instructorsAndModules = async (req, res) => {
  const instructorsAndModules = await prisma.event.findMany({
    where: {
      deleted: false,
    },
    select: {
      instructor: true,
      modules: true,
    },
  });

  return res.status(200).json({
    instructors: [
      ...new Set(
        instructorsAndModules
          .map((element) => JSON.parse(element?.instructor))
          .reduce((acc, array) => acc.concat(array), []),
      ),
    ],
    modules: [
      ...new Set(
        instructorsAndModules.map((ins) => {
          return ins?.modules;
        }),
      ),
    ],
  });
};

exports.deleteEvents = async (req, res) => {
  try {
    const { eventId } = req.body;
    const { id } = req?.userData;

    const validEvent = await prisma.event.findFirst({
      where: {
        id: eventId,
        userId: id,
      },
    });

    if (!validEvent) {
      return res.status(400).json({
        message: 'Invalid Event!',
      });
    }

    const eventDeleted = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        deleted: true,
      },
    });

    return res.status(200).json({
      eventDeleted,
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

exports.deleteAdditionalEventFile = async (req, res) => {
  try {
    const { id: fileId } = req?.params;

    console.log(req?.params);

    if (!fileId) {
      return res.status(400).json({
        message: 'Invalid file!',
      });
    }

    //check valid file
    const file = await prisma.file.findFirst({
      where: {
        id: +fileId,
      },
    });

    if (!file) {
      return res.status(400).json({
        message: 'Invalid File!',
      });
    }

    const imageDeleted = await prisma.file.delete({
      where: {
        id: +fileId,
      },
    });
    await fs.unlinkSync(imageDeleted.path);
    return res.status(200).json({
      imageDeleted,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(400).json({
      error,
    });
  }
};

exports.modules = async (req, res) => {
  const nowDate = req.params?.nowDate;
  try {
    const allModules = await prisma.event.findMany({
      where: {
        deleted: false,
        registrationEnd: {
          gte: nowDate,
        },
      },
      select: {
        id: true,
        title: true,
        modules: true,
      },
    });

    const uniqueModules = Array.from(
      new Set(allModules.map((obj) => obj.modules)),
    ).map((modules) => allModules.find((obj) => obj.modules === modules));

    return res.status(200).json({
      allModules: uniqueModules,
    });
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({
      err,
    });
  }
};

exports.getEventsWithModules = async (req, res) => {
  const modules = req.params?.moduleName;
  try {
    const events = await prisma.event.findMany({
      where: {
        deleted: false,
        modules: decodeURI(modules),
      },
    });

    return res.status(200).json({
      events,
    });
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({
      err,
    });
  }
};

exports.getEventsById = async (req, res) => {
  const id = req.params?.id;
  // console.log('getEventsById', req.params);

  try {
    const event = await prisma.event.findFirst({
      where: {
        id: +id,
      },
      include: {
        EventCreationAdditional: {
          include: {
            MaterialDocuments: true,
            MaterialImages: true,
            MaterialVideos: true,
          },
        },
      },
    });

    return res.status(200).json({
      event,
    });
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({
      err,
    });
  }
};

exports.getAlreadyRegisteredEvent = async (req, res) => {
  const eventId = req.params?.id;
  const { id } = req?.userData;

  try {
    const eventRegistration = await prisma.eventRegistration.findFirst({
      where: {
        eventId: +eventId,
        userId: id,
      },
    });
    if (!eventRegistration) {
      return res.status(400).json({
        message: 'Event not registered!',
      });
    } else {
      return res.status(200).json({
        eventRegistration,
      });
    }
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({
      err,
    });
  }
};
exports.getRegisteredEventDetails = async (req, res) => {
  const eventId = req.params?.id;

  try {
    const eventRegistration = await prisma.eventRegistration.findMany({
      where: {
        eventId: +eventId,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        documentUrl: true,
      },
    });

    return res.status(200).json({
      registrationDetails: eventRegistration.map((eventDetail, index) => {
        return {
          number: index + 1,
          receipt: eventDetail?.fullName + '-payment-receipt.pdf',
          ...eventDetail,
        };
      }),
    });
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({
      err,
    });
  }
};
// --------------------------------ADMIN---------------------------------
exports.eventsForAdmin = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        deleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      events,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err,
    });
  }
};

exports.deleteAdminEvents = async (req, res) => {
  try {
    const { eventId } = req.body;

    const validEvent = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!validEvent) {
      return res.status(400).json({
        message: 'Invalid Event!',
      });
    }

    const eventDeleted = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        deleted: true,
      },
    });

    return res.status(200).json({
      eventDeleted,
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

exports.registeredAdminEvents = async (req, res) => {
  try {
    const RegistrationEvent = await prisma.eventRegistration.findMany({
      where: {
        deleted: false,
      },
      include: {
        EventPayment: {
          include: {
            event: true,
            user: true,
          },
        },
      },
    });

    return res.status(200).json({ RegistrationEvent });
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({
      message: err,
    });
  }
};
