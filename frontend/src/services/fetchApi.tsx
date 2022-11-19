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
