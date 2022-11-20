const appJson = 'application/json';
const NUMBER = 3001;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';

export const fetchCreateUser = async (username: string, password: string) => {
  const fecthLogin = fetch(`http://${URL}:${PORT}/users`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const response = await fecthLogin;
  return response;
};

export const fetchLogin = async (username: string, password: string) => {
  const fecthLogin = fetch(`http://${URL}:${PORT}/users/login`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const response = await fecthLogin;
  return response;
};

export const fetchFindUserByUsername = async (username: string) => {
  const fecthFindUser = fetch(`http://${URL}:${PORT}/users/username`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify({
      username,
    }),
  });
  const response = await fecthFindUser;
  return response;
}

export const fetchFindAccountById = async (token: string, id: number) => {
  const fecthFindAccount = fetch(`http://${URL}:${PORT}/accounts/${id}`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
      Authorization: token,
    },
  });
  const response = await fecthFindAccount;
  return response;
}

export const fetchAllUserTransactions = async (token: string) => {
  const fecthUserTransactions = fetch(`http://${URL}:${PORT}/transactions`, {
    method: 'GET',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
      Authorization: token,
    },
  });
  const response = await fecthUserTransactions;
  return response;
}