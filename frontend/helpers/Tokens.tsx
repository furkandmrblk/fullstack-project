import jwt_decode from 'jwt-decode';

let accessToken: string = '';

export const setAccessToken = (incomingToken: string): void => {
  if (!incomingToken || incomingToken === null) {
    return null;
  }

  accessToken = incomingToken;
};

export const getAccessToken = (): string => {
  return accessToken;
};

export const fetchAccessToken = async (): Promise<any> => {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query:
        'mutation updateTokens {\n  updateTokens {\n    accessToken\n    __typename\n  }\n}\n',
    }),
  });

  return response.json();
};

export const accessTokenExpired = (): boolean => {
  let isValid: boolean = undefined;

  const token: any = getAccessToken().valueOf();

  if (!token || token === null) {
    return isValid === false;
  }

  let decodedToken: any = jwt_decode(token);

  let expiryDate = new Date(decodedToken.exp * 1000);
  let exp = decodedToken.exp * 1000;
  let dateNow = Date.now();

  // console.log(expiryDate);

  if (dateNow >= exp) {
    isValid === false;
  } else {
    isValid === true;
  }

  return isValid;
};
