import { PrismaClient } from '@prisma/client';
// import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usersInterface } from '../interfaces/usersInterface';
import AccountsService from './accountService';

class UsersService {
  public async create(user: usersInterface) {
    const { username, password } = user;
    const prisma = new PrismaClient();
    const account = await new AccountsService().create();
    const accountId = account.id;
    const passwordHash = bcrypt.hashSync(password, 10);
    const userCreated = prisma.users.create({
      data: {
        username,
        password: passwordHash,
        accountId
      }
    });
    return {
      id: (await userCreated).id,
      username: (await userCreated).username,
      accountId: (await userCreated).accountId
    };
  }
}

export default UsersService;
