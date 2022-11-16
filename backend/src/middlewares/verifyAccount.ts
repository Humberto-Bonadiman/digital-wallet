import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';
import { JwtPayload, verify } from 'jsonwebtoken';

class ValidateAccount {
  public async tokenValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const { id } = req.params;

      const SECRET = process.env.JWT_SECRET || (() => {
        throw new Error('SECRET not found')
      })();
      if (!token) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token not found' });
      }

      const decoded = verify(token, SECRET) as JwtPayload;

      const userToken = await new PrismaClient().users.findUnique({ where: { id: decoded.data.id }});

      if (!userToken || decoded.data.accountId !== Number(id)) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
      }

      next();
    } catch (err) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
    }
  }

  public async accountValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await new PrismaClient().accounts.findUniqueOrThrow({ where: { id: Number(id) }});

      next();
    } catch (err) {
      return res.status(StatusCode.NOT_FOUND).json({ message: 'Account not found' });
    }
  }
}

export default ValidateAccount;