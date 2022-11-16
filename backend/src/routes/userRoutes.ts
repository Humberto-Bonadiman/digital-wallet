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
    userController.create
  ).get('/', userController.findAll)
  .patch('/:id', validateUser.tokenValidation, userController.updateUserPassword);

export default userRouter;
