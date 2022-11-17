import { Decimal } from "@prisma/client/runtime";
import { accountInterface, createdAccountInterface } from "../../interfaces/accountInterface";

const newAccount: accountInterface = {
  balance: new Decimal(300.00)
};

const createdAccount: createdAccountInterface = {
  id: 1,
  balance: new Decimal(300.00)
}

export default { newAccount, createdAccount };