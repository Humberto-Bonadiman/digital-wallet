
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';
import bcrypt from 'bcrypt';
import { JwtPayload, verify } from 'jsonwebtoken';

class ValidateUser {
  public verifyIfEmpty(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(StatusCode.BAD_REQUEST)
        .json({ message: '"username" and "password" are required' });
    }

    next();
  }

  public validateUsername(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;
    if (username.length <= 3) {
      return res.status(StatusCode.BAD_REQUEST)
        .json({ message: '"username" length must be at least 3 characters long' });
    }
    const regexUsername = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValidUsername = regexUsername.test(username);
    if (isValidUsername === false) {
      return res.status(StatusCode.BAD_REQUEST)
        .json({ message: '"username" must be a valid email' });
    }
  
    next();
  }

  public verifyPassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    if (password.length < 8) {
      return res.status(StatusCode.BAD_REQUEST)
        .json({ message: '"password" length must be at least 8 characters long' });
    }
    const doesItHaveNumber = /[0-9]/.test(password);
    const doesItHaveUppercaseLetter = /[A-Z]/.test(password);
    if (!doesItHaveNumber || !doesItHaveUppercaseLetter) {
      return res.status(StatusCode.BAD_REQUEST)
        .json({ message: '"password" must contain at least one number and one uppercase letter'});
    }

    next();
  }

  public async verifyUser(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;
    const user = await new PrismaClient().users.findUnique({ where: { username }});
    if (user) {
      return res.status(StatusCode.CONFLICT).json({ message: 'User already registere' });
    }

    next();
  }

  public async verifyHashPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, username } = req.body;
      const verifyUsername = await new PrismaClient().users.findUniqueOrThrow({
        where: {
          username
        },
      });

      const comparePasswrod = await bcrypt.compare(password, verifyUsername.password);
      if (!comparePasswrod) {
        return res.status(StatusCode.NOT_FOUND).json({ message: '"password" does not match'});
      }
  
      next();
    } catch (err) {
      return res.status(StatusCode.NOT_FOUND).json({ message: '"username" does not match'});
    }
  }

  public async tokenValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const { id } = req.params;
      const { username } = req.body;

      const SECRET = process.env.JWT_SECRET || (() => {
        throw new Error('SECRET not found')
      })();
      if (!token) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token not found' });
      }

      const decoded = verify(token, SECRET) as JwtPayload;
      const user = await new PrismaClient().users.findUnique({ where: { id: decoded.data.id }});

      if (!user || decoded.data.id !== Number(id) || user.username !== username) {
        return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
      }

      next();
    } catch (err) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
    }
  }

  public async userValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await new PrismaClient().users.findUniqueOrThrow({ where: { id: Number(id) }});

      next();
    } catch (err) {
      return res.status(StatusCode.NOT_FOUND).json({ message: 'User not found' });
    }
  }
}

export default ValidateUser;
