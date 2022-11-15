import { Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import UsersService from '../services/userService';

class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const userService = new UsersService();
      const createUser = await userService.create({ username, password });
      return res.status(StatusCode.CREATED).json(createUser);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const userService = new UsersService();
      const loginUser = await userService.login(username);
      return res.status(StatusCode.OK).json('token: ' + loginUser);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default UserController;
