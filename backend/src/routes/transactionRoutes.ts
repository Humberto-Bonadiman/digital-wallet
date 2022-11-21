import * as express from 'express';
import TransactionController from '../controllers/transactionController';
import VerifyTransaction from '../middlewares/verifyTransaction';

const transactionRouter = express.Router();
const transactionController = new TransactionController();
const verifyTransaction = new VerifyTransaction();

transactionRouter
  .post(
    '/',
    verifyTransaction.tokenNotFound,
    verifyTransaction.tokenUsernameValidation,
    verifyTransaction.negativeValue,
    verifyTransaction.usersValidation,
    verifyTransaction.transferOverBalance,
    transactionController.create
  ).get(
    '/',
    verifyTransaction.tokenNotFound,
    verifyTransaction.tokenIdValidation,
    transactionController.findAllUserTransactions
  ).post(
    '/filter',
    verifyTransaction.tokenNotFound,
    verifyTransaction.tokenIdValidation,
    verifyTransaction.dateFormat,
    transactionController.filterUserTransactions
  );

export default transactionRouter;
