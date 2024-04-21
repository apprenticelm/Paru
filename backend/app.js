const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const multiparty = require('connect-multiparty');

const { PrismaClient } = require('@prisma/client');
const multipartyMiddleware = multiparty({ uploadDir: './upload' });

const bodyParser = require('body-parser');

const userRoute = require('./api/routes/user');
const eventRoute = require('./api/routes/events');
const homeRoute = require('./api/routes/home');

//configs
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With,Content-Type,Appect,Athurization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Methods', 'PUT,PATCH,POST,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

//prisma configuration

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('DB connected!');
  })
  .catch(async (e) => {
    console.error(e);
    console.log('DB disconnected!');
    await prisma.$disconnect();
    process.exit(1);
  });

//upload folder public access
app.use('/upload', express.static('upload'));
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/user', userRoute);
app.use('/event', eventRoute);
app.use('/home', multipartyMiddleware, homeRoute);

app.post('/upload', multipartyMiddleware, (req, res) => {
  if (req.files) {
    res.status(200).json({
      data: req.files,
      success: true,
      status: 200,
    });
  }
});

app.use((req, res, next) => {
  const error = new Error('Not Found ');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
module.export = app;
