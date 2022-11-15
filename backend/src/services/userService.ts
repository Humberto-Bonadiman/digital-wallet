import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usersInterface } from '../interfaces/usersInterface';
import AccountsService from './accountService';

class UsersService {
  public async create(user: usersInterface) {
    const { username, password } = user;
    const prisma = new PrismaClient();
    const account = new AccountsService();
    const accountId = (await account.create()).id;
    console.log(accountId + 'accountId');
    const passwordHash = bcrypt.hashSync(password, 10);
    console.log(passwordHash + 'passwordHash');
    const userCreated = prisma.users.create({
      data: {
        username,
        password: passwordHash,
        accountId
      }
    });
    return userCreated;
  }
}

export default UsersService;
