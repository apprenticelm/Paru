const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const fs = require('fs');

// --------------------------------USER---------------------------------

exports.uploadImages = async (req, res) => {
  // create this logic error free

  // const { fieldName, originalFilename, path, headers, size, name, type } =
  //   req.files?.file;

  try {
    const image = await prisma.homeImages.create({
      data: {
        fieldName: req?.files?.file?.fieldName,
        originalFilename: req?.files?.file.originalFilename,
        path: req?.files?.file.path,
        headers: req?.files?.file.headers,
        size: req?.files?.file.size,
        name: req?.files?.file.name,
        type: req?.files?.file.type,
      },
    });

    return res
      .status(200)
      .json({ message: 'Images uploaded successfully', image });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Images uploaded failed', error });
  }
};

exports.getAllImages = async (req, res) => {
  const images = await prisma.homeImages.findMany();
  return res.json({ images });
};

exports.removeImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await prisma.homeImages.delete({
      where: {
        id: +id,
      },
    });

    // also delete the file from the folder
    await fs.unlinkSync(image.path);

    return res
      .status(200)
      .json({ message: 'Image deleted successfully', image });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Image deleted failed', error });
  }
};
