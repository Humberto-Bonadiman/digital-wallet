import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';
import { JwtPayload, verify } from 'jsonwebtoken';

class VerifyTransaction {
  public async tokenNotFound(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token not found' });
    }

    next();
  }

  public async tokenUsernameValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;
      const { debitedUsername } = req.body;

      const SECRET = process.env.JWT_SECRET || (() => {
        throw new Error('SECRET not found')
      })();

      const decoded = verify(token, SECRET) as JwtPayload;

      if (decoded.data.username !== debitedUsername) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
      }

      next();
    } catch (err) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
    }
  }

  public async tokenIdValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;

      const SECRET = process.env.JWT_SECRET || (() => {
        throw new Error('SECRET not found')
      })();

      verify(token, SECRET) as JwtPayload;

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
      if (debitedUsername === creditedUsername) {
        return res.status(StatusCode.BAD_REQUEST).json({
          message: '"debitedUsername" and "creditedUsername" cannot be equals'
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

  public async dateFormat(req: Request, res: Response, next: NextFunction) {
    const { date } = req.body;
    if (date) {
      if (date.length !== 10) {
        return res.status(StatusCode.BAD_REQUEST)
          .json({ message: '"date" must be in dd-mm-yyyy format'});
      }
      if (!(date.indexOf('-') === 2)
        || !(date.indexOf('-', 3) === 5)) {
        return res.status(StatusCode.BAD_REQUEST)
          .json({ message: '"date" must be in dd-mm-yyyy format'});
      }
      const dateReplace = date.replaceAll('-', '');
      if (isNaN(dateReplace)) {
        return res.status(StatusCode.BAD_REQUEST)
          .json({ message: '"date" is in wrong format' });
      }
    }

    next();
  }
}

export default VerifyTransaction;
