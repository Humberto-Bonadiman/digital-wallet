import { usersInterface, createdUserInterface } from "../../interfaces/usersInterface";

const newUser: usersInterface = {
  username: 'username_for_test@email.com',
  password: 'Username1Test',
}

const createdUser: createdUserInterface = {
  id: 1,
  username: 'username_for_test@email.com',
  password: 'Username1Test',
  accountId: 1
}

export default { newUser, createdUser };