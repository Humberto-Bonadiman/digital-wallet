import { Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import AccountsService from '../services/accountService';

class AccountController {
  public async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const accountService = new AccountsService();
      const findAccountById = await accountService.findById(Number(id));
      return res.status(StatusCode.OK).json(findAccountById);
    } catch (error) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default AccountController;