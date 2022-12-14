import { Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import TransactionService from '../services/transactionService';

class TransactionController {
  public async create(req: Request, res: Response) {
    try {
      const { debitedUsername, creditedUsername, value } = req.body;
      const transactionService = new TransactionService();
      const createTransaction = await transactionService
        .create(debitedUsername, creditedUsername, value);
      return res.status(StatusCode.CREATED).json(createTransaction);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async findAllUserTransactions(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;
      if (typeof authorization === 'string') {
        const transactionService = new TransactionService();
        const findTransactions = await transactionService.findAllUserTransactions(authorization);
        return res.status(StatusCode.OK).json(findTransactions);
      }
      throw Error;
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async filterUserTransactions(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;
      const { debited, credited, date } = req.body;
      if (typeof authorization === 'string') {
        const transactionService = new TransactionService();
        const filterUser = await transactionService
          .filterUserTransactions(authorization, debited, credited, date);
        return res.status(StatusCode.OK).json(filterUser);
      }
      throw Error;
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default TransactionController;
