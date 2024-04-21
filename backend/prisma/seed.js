const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
/* Create First Super Admin User */
const createFirstSuperAdmin = async () => {
  const email = process.env.FIRST_SUPER_ADMIN_EMAIL || 'fazrin@padimedical.com';
  const password = process.env.FIRST_SUPER_ADMIN_PASSWORD || 'PARU@2023';

  if (
    await prisma.user.findFirst({
      where: {
        email,
      },
    })
  ) {
    return console.log('Admin Already Exists!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      firstName: 'admin',
      lastName: 'admin',
      email,
      password: hashedPassword,
      role: 'admin',
    },
  });
};

async function main() {
  await createFirstSuperAdmin();
  console.log('seed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
