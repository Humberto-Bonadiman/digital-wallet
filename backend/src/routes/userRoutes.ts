import * as express from 'express';
import UserController from '../controllers/userController';
import ValidateUser from '../middlewares/verifyUser';

const userRouter = express.Router();
const validateUser = new ValidateUser();
const userController = new UserController();

userRouter
  .post(
    '/login',
    validateUser.verifyIfEmpty,
    validateUser.verifyHashPassword,
    userController.login
  ).post(
    '/',
    validateUser.verifyIfEmpty,
    validateUser.validateUsername,
    validateUser.verifyPassword,
    validateUser.verifyUser,
    userController.create
  ).get('/', userController.findAll)
  .patch(
    '/:id',
    validateUser.tokenValidation,
    userController.updateUserPassword
  ).delete(
    '/:id',
    validateUser.userValidation,
    validateUser.tokenValidation,
    userController.deleteById
  );

export default userRouter;
