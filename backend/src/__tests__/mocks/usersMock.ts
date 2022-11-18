import { usersInterface, createdUserInterface } from "../../interfaces/usersInterface";

const newUser: usersInterface = {
  username: 'username_for_test1@email.com',
  password: 'Username1Test',
}

const createdUser: createdUserInterface = {
  id: 1,
  username: 'username_for_test1@email.com',
  password: 'Username1Test',
  accountId: 1
}

const newUserService: usersInterface = {
  username: 'username_for_test2@email.com',
  password: 'Username2Test',
}

const createdUserService: createdUserInterface = {
  id: 2,
  username: 'username_for_test2@email.com',
  password: 'Username2Test',
  accountId: 2
}

const newUserController: usersInterface = {
  username: 'username_for_test3@email.com',
  password: 'Username3Test',
}

const createdUserController: createdUserInterface = {
  id: 3,
  username: 'username_for_test3@email.com',
  password: 'Username3Test',
  accountId: 3
}

export default {
  newUser,
  createdUser,
  newUserService,
  createdUserService,
  newUserController,
  createdUserController
};