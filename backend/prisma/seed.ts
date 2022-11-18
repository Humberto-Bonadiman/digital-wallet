import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

async function main() {
  const passwordAlice = '1234567A';
  const passwordHashAlice = bcrypt.hashSync(passwordAlice, 10);
  await prisma.accounts.upsert({
    where: { id: 1 },
    update: {
      balance: 100.00
    },
    create: {
      id: 1,
      balance: 100.00
    },
  });

  await prisma.users.upsert({
    where: { id: 1 },
    update: {
      username: 'alice@prisma.io',
      password: passwordHashAlice,
      accountId: 1
    },
    create: {
      id: 1,
      username: 'alice@prisma.io',
      password: passwordHashAlice,
      accountId: 1
    },
  });
  const passwordBob = 'Abcdefg1';
  const passwordHashBob = bcrypt.hashSync(passwordBob, 10);

  await prisma.accounts.upsert({
    where: { id: 2 },
    update: {
      balance: 100.00
    },
    create: {
      id: 2,
      balance: 100.00
    },
  });

  await prisma.users.upsert({
    where: { id: 2 },
    update: {
      username: 'bob@prisma.io',
      password: passwordHashBob,
      accountId: 2
    },
    create: {
      id: 2,
      username: 'bob@prisma.io',
      password: passwordHashBob,
      accountId: 2
    },
  });

  await prisma.accounts.upsert({
    where: { id: 3 },
    update: {
      balance: 100.00
    },
    create: {
      id: 3,
      balance: 100.00
    },
  });

  await prisma.users.upsert({
    where: { id: 3 },
    update: {
      username: 'natsu@prisma.io',
      password: passwordHashBob,
      accountId: 3
    },
    create: {
      id: 3,
      username: 'natsu@prisma.io',
      password: passwordHashBob,
      accountId: 3
    },
  });

  await prisma.accounts.upsert({
    where: { id: 4 },
    update: {
      balance: 100.00
    },
    create: {
      id: 4,
      balance: 100.00
    },
  });

  await prisma.accounts.upsert({
    where: { id: 5 },
    update: {
      balance: 100.00
    },
    create: {
      id: 5,
      balance: 100.00
    },
  });

  await prisma.users.upsert({
    where: { id: 5 },
    update: {
      username: 'erza@prisma.io',
      password: passwordHashBob,
      accountId: 5
    },
    create: {
      id: 5,
      username: 'erza@prisma.io',
      password: passwordHashBob,
      accountId: 5
    },
  });

  await prisma.transactions.upsert({
    where: { id: 1 },
    update: {
      debitedAccountId: 1,
      creditedAccountId: 2,
      value: 5.00,
      createdAt: '31-05-2022'
    },
    create: {
      id: 1,
      debitedAccountId: 1,
      creditedAccountId: 2,
      value: 5.00,
      createdAt: '31-05-2022'
    }
  });

  await prisma.transactions.upsert({
    where: { id: 2 },
    update: {
      debitedAccountId: 2,
      creditedAccountId: 1,
      value: 5.00,
      createdAt: '31-05-2022'
    },
    create: {
      id: 2,
      debitedAccountId: 2,
      creditedAccountId: 1,
      value: 5.00,
      createdAt: '31-05-2022'
    }
  });

  await prisma.transactions.upsert({
    where: { id: 3 },
    update: {
      debitedAccountId: 3,
      creditedAccountId: 1,
      value: 5.00,
      createdAt: '31-05-2022'
    },
    create: {
      id: 3,
      debitedAccountId: 3,
      creditedAccountId: 1,
      value: 5.00,
      createdAt: '31-05-2022'
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })