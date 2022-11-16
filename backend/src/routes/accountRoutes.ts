import * as express from 'express';
import AccountController from '../controllers/accountController';
import ValidateAccount from '../middlewares/verifyAccount';

const accountRouter = express.Router();
const accountController = new AccountController();
const validateAccount = new ValidateAccount();

accountRouter
  .get(
    '/:id',
    validateAccount.tokenValidation,
    validateAccount.accountValidation,
    accountController.findById
  );

export default accountRouter;