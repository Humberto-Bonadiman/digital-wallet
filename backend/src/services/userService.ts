import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
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

  public async login(username: string) {
    const prisma = new PrismaClient();
    const expiresIn = '1d';
    const algorithm = 'HS256';
    const findUniqueUser = await prisma.users.findUnique({
      where: {
        username
      },
      select: {
        id: true,
        username: true,
        accountId: true
      }
    });
    const SECRET = process.env.JWT_SECRET || (() => {
      throw new Error('SECRET not found')
    })();
    const token = sign({ data: findUniqueUser }, SECRET, { expiresIn, algorithm });

    return token;
  }

  public async findAll() {
    const prisma = new PrismaClient();
    const findAllUsers = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        accountId: true
      }
    });

    return findAllUsers;
  }

  public async updateUserPassword(user: usersInterface) {
    const prisma = new PrismaClient();
    const { username, password } = user;
    const passwordHash = bcrypt.hashSync(password, 10);
    const update = await prisma.users.update({
      where: {
        username: username
      },
      data: {
        password: passwordHash
      }
    });
    return update;
  }
}

export default UsersService;
