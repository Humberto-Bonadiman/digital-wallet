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
}

export default TransactionController;
