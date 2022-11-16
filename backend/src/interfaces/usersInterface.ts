export interface usersInterface {
  username: string,
  password: string,
}

export interface createdUserInterface extends usersInterface {
  id: number,
  accountId: number
}