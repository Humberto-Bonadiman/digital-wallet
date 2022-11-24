const tokenNotFound = 'Token not found';
const invalidToken = 'Expired or invalid token';
const usernameRequired = '"debitedUsername" and "creditedUsername" are required';
const usernameEqual = '"debitedUsername" and "creditedUsername" cannot be equals';
const userRegistered = 'All users must be registered';
const valueBeyond = 'It is not possible to transfer beyond the balance';
const valueRequired = '"value" is required';
const validEmail = '"username" must be a valid email';
const validPassword = '"password" must contain at least one number and one uppercase letter';
const userAlreadyRegistered = 'User already registered';

const checkErrors = (message: string) => {
  switch (message) {
    case validEmail:
      return 'Username precisa ser um e-mail válido!';
    case validPassword:
      return 'A senha precisa conter pelo menos um número e uma letra maiúscula!';
    case userAlreadyRegistered:
      return 'Usuário já registrado!';
    case tokenNotFound:
      return 'Token não encontrado!';
    case invalidToken:
      return 'Token inválido!';
    case usernameRequired || usernameEqual:
      return 'Username da conta recebedora está inválido!';
    case userRegistered:
      return 'Usuário não registrado!';
    case valueBeyond:
      return 'Não é possível transferir além do saldo!';
    case valueRequired:
      return 'O valor é obrigatório!';
  }
}

export default checkErrors;