import { PrismaClient } from '@prisma/client';

class AccountsService {
  static readonly initialBalance: number = 100.0

  public create() {
    const prisma = new PrismaClient();
    const balance = AccountsService.initialBalance
    const createAccount = prisma.accounts.create({
      data: { balance }
    });
    return createAccount;
  }
}

export default AccountsService;
