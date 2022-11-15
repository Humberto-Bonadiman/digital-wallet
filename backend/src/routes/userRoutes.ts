import * as express from 'express';
import UserController from '../controllers/userController';
import ValidateUser from '../middlewares/verifyUser';

const userRouter = express.Router();
const validateUser = new ValidateUser();

userRouter
  .post(
    '/login',
    validateUser.verifyIfEmpty,
    validateUser.verifyHashPassword,
    new UserController().login
  ).post(
    '/',
    validateUser.verifyIfEmpty,
    validateUser.validateUsername,
    validateUser.verifyPassword,
    new UserController().create
  );

export default userRouter;
