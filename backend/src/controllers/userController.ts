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
      return res.status(StatusCode.OK).json({ token: loginUser });
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async findAll(_req: Request, res: Response) {
    try {
      const userService = new UsersService();
      const findAllUsers = await userService.findAll();
      return res.status(StatusCode.OK).json(findAllUsers);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async findByUsername(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const userService = new UsersService();
      const findUserByUsername = await userService.findByUsername(username);
      return res.status(StatusCode.OK).json(findUserByUsername);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userService = new UsersService();
      const findUserById = await userService.findById(Number(id));
      return res.status(StatusCode.OK).json(findUserById);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async updateUserPassword(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const userService = new UsersService();
      await userService.updateUserPassword({ username, password });
      return res.status(StatusCode.NO_CONTENT).end();
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  public async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userService = new UsersService();
      await userService.deleteById(Number(id));
      return res.status(StatusCode.NO_CONTENT).end();
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default UserController;
