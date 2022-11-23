import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

async function main() {
  const passwordAlice = '1234567A';
  const passwordHashAlice = bcrypt.hashSync(passwordAlice, 10);
  await prisma.accounts.upsert({
    where: { id: 1000000 },
    update: {
      balance: 100.00
    },
    create: {
      id: 1000000,
      balance: 100.00
    },
  });

  await prisma.users.upsert({
    where: { id: 1000000 },
    update: {
      username: 'alice@email.com',
      password: passwordHashAlice,
      accountId: 1000000
    },
    create: {
      id: 1000000,
      username: 'alice@email.com',
      password: passwordHashAlice,
      accountId: 1000000
    },
  });
  const passwordBob = 'Abcdefg1';
  const passwordHashBob = bcrypt.hashSync(passwordBob, 10);

  await prisma.accounts.upsert({
    where: { id: 1000001 },
    update: {
      balance: 100.00
    },
    create: {
      id: 1000001,
      balance: 100.00
    },
  });

  await prisma.users.upsert({
    where: { id: 1000001 },
    update: {
      username: 'bob@email.com',
      password: passwordHashBob,
      accountId: 1000001
    },
    create: {
      id: 1000001,
      username: 'bob@email.com',
      password: passwordHashBob,
      accountId: 1000001
    },
  });

  await prisma.accounts.upsert({
    where: { id: 1000002 },
    update: {
      balance: 100.00
    },
    create: {
      id: 1000002,
      balance: 100.00
    },
  });

  await prisma.users.upsert({
    where: { id: 1000002 },
    update: {
      username: 'natsu@email.com',
      password: passwordHashBob,
      accountId: 1000002
    },
    create: {
      id: 1000002,
      username: 'natsu@email.com',
      password: passwordHashBob,
      accountId: 1000002
    },
  });

  await prisma.accounts.upsert({
    where: { id: 1000003 },
    update: {
      balance: 100.00
    },
    create: {
      id: 1000003,
      balance: 100.00
    },
  });

  await prisma.accounts.upsert({
    where: { id: 1000004 },
    update: {
      balance: 100.00
    },
    create: {
      id: 1000004,
      balance: 100.00
    },
  });

  await prisma.users.upsert({
    where: { id: 1000004 },
    update: {
      username: 'erza@email.com',
      password: passwordHashBob,
      accountId: 1000004
    },
    create: {
      id: 1000004,
      username: 'erza@email.com',
      password: passwordHashBob,
      accountId: 1000004
    },
  });

  await prisma.accounts.upsert({
    where: { id: 1000005 },
    update: {
      balance: 100.00
    },
    create: {
      id: 1000005,
      balance: 100.00
    },
  });

  await prisma.users.upsert({
    where: { id: 1000005 },
    update: {
      username: 'dragon@email.com',
      password: passwordHashBob,
      accountId: 1000005
    },
    create: {
      id: 1000005,
      username: 'dragon@email.com',
      password: passwordHashBob,
      accountId: 1000005
    },
  });

  await prisma.transactions.upsert({
    where: { id: 1000000 },
    update: {
      debitedAccountId: 1000000,
      creditedAccountId: 1000001,
      value: 5.00,
      createdAt: '31-05-2022'
    },
    create: {
      id: 1000000,
      debitedAccountId: 1000000,
      creditedAccountId: 1000001,
      value: 5.00,
      createdAt: '31-05-2022'
    }
  });

  await prisma.transactions.upsert({
    where: { id: 1000001 },
    update: {
      debitedAccountId: 1000001,
      creditedAccountId: 1000000,
      value: 5.00,
      createdAt: '31-05-2022'
    },
    create: {
      id: 1000001,
      debitedAccountId: 1000001,
      creditedAccountId: 1000000,
      value: 5.00,
      createdAt: '31-05-2022'
    }
  });

  await prisma.transactions.upsert({
    where: { id: 1000002 },
    update: {
      debitedAccountId: 1000002,
      creditedAccountId: 1000000,
      value: 5.00,
      createdAt: '31-05-2022'
    },
    create: {
      id: 1000002,
      debitedAccountId: 1000002,
      creditedAccountId: 1000000,
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