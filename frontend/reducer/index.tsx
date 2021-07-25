import { NormalizedCacheObject } from '@apollo/client';
import { createContext } from 'react';

export const initialState: string = 'false';

export interface AppContextInterface {
  authState: string;
  authDispatch: (value: string) => void;
}

const AuthReducer = (state: string, action: string) => {
  switch (action) {
    case 'login':
      return 'true';
    case 'logout':
      return 'false';
    default:
      return state;
  }
};

export default AuthReducer;

export const Context = createContext<AppContextInterface>(null);
