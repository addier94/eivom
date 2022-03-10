import {AUTH, LOGOUT} from '@components/auth/context';

export interface IUser {
  _id : string;
  name : string;
  email : string;
  password?: string;
  role : string;

  createdAt?: string;
  updatedAt?: string;
}

export interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
  logout: () => void;
}

// auth Provider
export type AuthActionType =
   | { type: typeof AUTH, payload: IUser }
   | { type: typeof LOGOUT }

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}
