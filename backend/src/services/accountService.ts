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
}

export default AccountsService;
