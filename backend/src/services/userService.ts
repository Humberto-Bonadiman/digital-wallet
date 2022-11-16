import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usersInterface } from '../interfaces/usersInterface';
import AccountsService from './accountService';

class UsersService {
  public async create(user: usersInterface) {
    try {
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
    } catch (err) {
      throw Error;
    }
  }

  public async login(username: string) {
    try {
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
    } catch (err) {
      throw Error;
    }
  }

  public async findAll() {
    try {
      const prisma = new PrismaClient();
      const findAllUsers = await prisma.users.findMany({
        select: {
          id: true,
          username: true,
          accountId: true
        }
      });
  
      return findAllUsers;
    } catch (err) {
      throw Error;
    }
  }

  public async findById(id: number) {
    try {
      const prisma = new PrismaClient();
      const findUserById = await prisma.users.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          username: true,
          accountId: true
        }
      });
  
      return findUserById;
    } catch (err) {
      throw Error;
    }
  }

  public async updateUserPassword(user: usersInterface) {
    try {
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
    } catch (err) {
      throw Error;
    }
  }

  public async deleteById(id: number) {
    try {
      const prisma = new PrismaClient();
      const findUser = await prisma.users.findUniqueOrThrow({ where: { id }});
      await prisma.users.delete({ where: { id }});
      await prisma.accounts.delete({ where: { id: findUser.accountId }});
    } catch (err) {
      throw Error;
    }
  }
}

export default UsersService;
