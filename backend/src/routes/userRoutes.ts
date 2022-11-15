import * as express from 'express';
import UserController from '../controllers/userController';

const userRouter = express.Router();

userRouter
  .post('/', new UserController().create);

export default userRouter;
