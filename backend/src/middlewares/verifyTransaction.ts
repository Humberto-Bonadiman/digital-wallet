import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';
import { JwtPayload, verify } from 'jsonwebtoken';

class VerifyTransaction {
  public async tokenValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const { debitedUsername } = req.body;

      const SECRET = process.env.JWT_SECRET || (() => {
        throw new Error('SECRET not found')
      })();
      if (!token) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token not found' });
      }

      const decoded = verify(token, SECRET) as JwtPayload;

      if (decoded.data.username !== debitedUsername) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
      }

      next();
    } catch (err) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
    }
  }

  public async negativeValue(req: Request, res: Response, next: NextFunction) {
    const { value } = req.body;
    if (!value) {
      return res.status(StatusCode.BAD_REQUEST).json({ message: '"value" is required' });
    }
    if (value < 0) {
      return res.status(StatusCode.BAD_REQUEST).json({ message: '"value" cannot be negative' });
    }

    next();
  }

  public async usersValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const { debitedUsername, creditedUsername } = req.body;
      if (!debitedUsername || !creditedUsername) {
        return res.status(StatusCode.BAD_REQUEST).json({
          message: '"debitedUsername" and "creditedUsername" are required'
        });
      }
      await new PrismaClient().users.findUniqueOrThrow({
        where: { username: debitedUsername }
      });
      await new PrismaClient().users.findUniqueOrThrow({
        where: { username: creditedUsername }
      });

      next();
    } catch (err) {
      return res.status(StatusCode.NOT_FOUND).json({ message: 'All users must be registered' });
    }
  }

  public async transferOverBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const { debitedUsername, value } = req.body;
      const debitedUser = await new PrismaClient().users.findUniqueOrThrow({
        where: { username: debitedUsername }
      });
      const debitedAccount = await new PrismaClient().accounts.findUniqueOrThrow({
        where: { id: debitedUser.accountId }
      });
      if (value > debitedAccount.balance) {
        return res.status(StatusCode.UNAUTHORIZED).json({
          message: 'It is not possible to transfer beyond the balance'
        });
      }
  
      next();
    } catch (err) {
      return res.status(StatusCode.NOT_FOUND).json({ message: 'Account not found' });
    }

  }
}

export default VerifyTransaction;
