import { PrismaClient } from '@prisma/client';

class AccountsService {
  public create() {
    const prisma = new PrismaClient();
    const initialBalance = 100.00
    const createAccount = prisma.accounts.create({
      data: { balance: initialBalance }
    });
    return createAccount;
  }

  public async findById(id: number) {
    try {
      const findAccountById = await new PrismaClient().accounts.findUniqueOrThrow({
        where: { id }
      });
      return findAccountById;
    } catch (err) {
      throw Error;
    }
  }
}

export default AccountsService;
