import * as express from 'express';
import TransactionController from '../controllers/transactionController';
import VerifyTransaction from '../middlewares/verifyTransaction';

const transactionRouter = express.Router();
const transactionController = new TransactionController();
const verifyTransaction = new VerifyTransaction();

transactionRouter
  .post(
    '/',
    verifyTransaction.tokenValidation,
    verifyTransaction.negativeValue,
    verifyTransaction.usersValidation,
    verifyTransaction.transferOverBalance,
    transactionController.create
  );

export default transactionRouter;
