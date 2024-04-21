const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateApiKey } = require('generate-api-key');
const { emailSender, approvedAccountHtml } = require('../services/email');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        deleted: false,
        role: 'user',
      },
    });

    return res.status(200).json(users);
  } catch (err) {
    console.log('error', err);
    return res.status(401).json({
      message: err,
    });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const id = req.params?.id;

    const user = await prisma.user.findFirst({
      where: {
        id: +id,
        deleted: false,
        role: 'user',
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'User not found!',
      });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log('error', err);
    return res.status(401).json({
      message: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: +userId,
        role: 'user',
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: +userId,
        },
        data: {
          deleted: true,
        },
      }),
      prisma.event.updateMany({
        where: {
          user: {
            id: +userId,
          },
        },
        data: {
          deleted: true,
        },
      }),
    ]);

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.log('error', err);
    return res.status(401).json({
      message: err,
    });
  }
};

exports.userSignup = async (req, res) => {
  try {
    const { email, firstName, lastName, role, password} = req.body;
    
    if ( !email || !password || !firstName || !lastName )
    {
      return res.status(409).json({
        message:
          'Enter email , password, firstName , lastName!',
      });
    }

    const userAlreadyExist = await prisma.user.findFirst({
      where: {
        email,
        deleted: false,
      },
    });
    if (userAlreadyExist) {
      return res.status(409).json({
        message: 'User already exists!',
      });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        const createUser = await prisma.user.create({
          data: {
            email,
            firstName,
            lastName,
            password: hash,
            role,
            // speciality,
            // interests,
            // salutation,
            // title,
            // username,
            // practicingNumber,
            // department,
            // phoneNumber,
          },
        });

        if (createUser) {
          const token = jwt.sign(
            {
              email: createUser.email,
              userId: createUser.id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '100000000h',
            },
          );
          emailSender({
            to: createUser?.email,
            subject: 'Your account has been approved',
            html: approvedAccountHtml,
          });
          return res.status(200).json({
            user: {
              id: createUser.id,
              firstName,
              lastName,
              email,
              // speciality,
              // interests,
              // salutation,
              // title,
              // department,
              // practicingNumber,
              // username,
              // phoneNumber,
              role: createUser.role,
            },
            token: token,
          });
        }
      }
    });
  } catch (err) {
    console.log('error', err);
    return res.status(401).json({
      message: err,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    // console.log(user);

    if (!user) {
      return res.status(401).json({
        message: 'Incorrect email address or password!',
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Incorrect password!',
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user.id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1000000000h',
          },
        );
        return res.status(200).json({
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email,
            role: user.role,
          },
          token: token,
        });
      } else {
        return res.status(401).json({
          message: 'Incorrect email address or password!',
        });
      }
    });
  } catch (err) {
    return res.status(401).json({
      message: err,
    });
  }
};

exports.findbyToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const me = await prisma.user.findFirst({
      where: {
        id: decoded?.userId,
      },
    });
    delete me.password;
    return res.status(200).json(me);
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed',
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    console.log('userData', req?.params);
    const { id } = req?.params;
    const { data } = req.body;

    const isValidUser = await prisma.user.findFirst({
      where: {
        id: +id,
        role: 'user',
        deleted: false,
      },
    });

    if (!isValidUser) {
      return res.status(400).json({
        message: 'Invalid User!',
      });
    }

    const updatedUser = await prisma.user.update({
      data,
      where: {
        id: +id,
      },
    });

    return res.status(200).json({ updatedUser });
  } catch (error) {
    console.log('error', error);
    return res.status(401).json({
      message: 'some error failed',
      error: error,
    });
  }
};

exports.updateAdminCredentials = async (req, res) => {
  try {
    const { id } = req?.userData;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(409).json({
        message: 'Enter email , password!',
      });
    }
    const emailAlreadyExist = await prisma.user.findFirst({
      where: {
        email,
        role: 'user',
      },
    });
    if (emailAlreadyExist) {
      return res.status(400).json({
        message: 'This email already in use!',
      });
    }

    const isValidUser = await prisma.user.findFirst({
      where: {
        id,
        role: 'admin',
        deleted: false,
      },
    });
    if (!isValidUser) {
      return res.status(400).json({
        message: 'Invalid User!',
      });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        const user = await prisma.user.update({
          data: {
            email,
            password: hash,
          },
          where: {
            id: isValidUser?.id,
          },
        });
        return res.status(200).json({ user });
      }
    });
  } catch (error) {
    console.log('error', error);
    return res.status(401).json({
      message: 'some error failed',
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const validEmail = await prisma.user?.findFirst({
      where: {
        email,
      },
    });

    if (!validEmail) {
      return res.status(400).json({
        message: 'User not found by this email!',
      });
    }

    const key = generateApiKey();

    const user = await prisma.user.update({
      data: {
        key,
      },
      where: {
        email,
      },
    });

    const resetPasswordLink =
      process.env.FRONTEND_URL + '/reset-password/' + user?.email + '?q=' + key;

    emailSender({
      to: user?.email,
      subject: 'Reset Password',
      html:
        '<a href=' + resetPasswordLink + '>Click here to reset password</a>',
    });
    return res.status(200).json({
      msg: 'email sent successfully!',
    });
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, key, password } = req.body;

    const validEmail = await prisma.user?.findFirst({
      where: {
        email,
        key,
      },
    });

    if (!validEmail) {
      return res.status(400).json({
        message: 'User not found by this email and key!',
      });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        const updateUser = await prisma.user.update({
          data: {
            password: hash,
            key: '',
          },
          where: {
            email,
          },
        });

        if (updateUser) {
          return res.status(200).json({
            msg: 'Password updated successfully!',
          });
        }
      }
    });
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({
      message: err,
    });
  }
};
