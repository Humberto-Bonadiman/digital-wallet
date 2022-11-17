import { Decimal } from "@prisma/client/runtime"

export interface accountInterface {
  balance: Decimal
}

export interface createdAccountInterface extends accountInterface {
  id: number
}