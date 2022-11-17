import { PrismaClient, Transactions } from '@prisma/client';
import { JwtPayload, verify } from 'jsonwebtoken';

class TransactionService {
  public async create(debitedUsername: string, creditedUsername: string, value: number) {
    const findDebitedUser = await new PrismaClient().users.findUniqueOrThrow({
      where: { username: debitedUsername },
      select: {
        id: true,
        username: true,
        accountId: true
      }
    });
    const findCreditedUser = await new PrismaClient().users.findUniqueOrThrow({
      where: { username: creditedUsername },
      select: {
        id: true,
        username: true,
        accountId: true
      }
    });
    const findDebitedAccount = await new PrismaClient().accounts.findUniqueOrThrow({
      where: { id: findDebitedUser.accountId }
    });
    await new PrismaClient().accounts.update({
      where: { id: findDebitedUser.accountId },
      data: { balance: (Number(findDebitedAccount.balance) - value) }
    });

    const findCreditedAccount = await new PrismaClient().accounts.findUniqueOrThrow({
      where: { id: findCreditedUser.accountId }
    });
    await new PrismaClient().accounts.update({
      where: { id: findCreditedUser.accountId },
      data: { balance: (Number(findCreditedAccount.balance) + value) }
    });
    const dateNow = new Date();
    const formatDate = `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`;

    const createTransaction = await new PrismaClient().transactions.create({
      data: {
        debitedAccountId: findDebitedUser.accountId,
        creditedAccountId: findCreditedUser.accountId,
        value,
        createdAt: formatDate
      }
    });
    return createTransaction;
  }

  public async findAllUserTransactions(token: string) {
    try {
      const SECRET = process.env.JWT_SECRET || (() => {
        throw new Error('SECRET not found')
      })();
      const decoded = verify(token, SECRET) as JwtPayload;
      const findUser = await new PrismaClient().users.findUniqueOrThrow({
        where: { id: decoded.data.id },
        select: {
          id: true,
          username: true,
          accountId: true
        }
      });
      const findAccount = await new PrismaClient().accounts.findUniqueOrThrow({
        where: { id: findUser.accountId }
      });
      const findTransactionsByAccountId = await new PrismaClient().transactions.findMany({
        where: {
          OR: [
            { debitedAccountId: findAccount.id },
            { creditedAccountId: findAccount.id }
          ]
        }
      });
      return findTransactionsByAccountId;
    } catch (err) {
      throw Error;
    }
  }

  public async filterUserTransactions(
    token: string,
    debited: boolean,
    credited: boolean,
    date?: string
  ) {
    try {
      const SECRET = process.env.JWT_SECRET || (() => {
        throw new Error('SECRET not found')
      })();
      const decoded = verify(token, SECRET) as JwtPayload;
      const findUser = await new PrismaClient().users.findUniqueOrThrow({
        where: { id: decoded.data.id },
        select: {
          id: true,
          username: true,
          accountId: true
        }
      });
      const findAccount = await new PrismaClient().accounts.findUniqueOrThrow({
        where: { id: findUser.accountId }
      });

      let debitedTrue: Transactions[] = [];
      let creditedTrue: Transactions[] = [];

      if (debited === true) {
        debitedTrue = await new PrismaClient().transactions.findMany({
          where: {
            debitedAccountId: findAccount.id,
            createdAt: date,
          }
        });
        // console.log(debitedTrue);
      }

      if (credited === true) {
        creditedTrue = await new PrismaClient().transactions.findMany({
          where: {
            creditedAccountId: findAccount.id,
            createdAt: date
          }
        });
        // console.log(creditedTrue);
      }

      return [...debitedTrue, ...creditedTrue];

    } catch (err) {
      throw Error;
    }
  }
}

export default TransactionService;
