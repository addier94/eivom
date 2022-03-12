
import {FC, useReducer, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useSession, signOut} from 'next-auth/react';

import Cookies from 'js-cookie';
import axios from 'axios';


import {AuthActionType, AuthState, ContextProps, IUser} from '@type/authContext';
import {createContext} from 'react';
import {eivomApi} from 'api';


export const AuthContext = createContext({} as ContextProps );
// auth Reducer
export const AUTH = '[Auth] - Login';
export const LOGOUT = '[Auth] - Logout';

export const authReducer = ( state: AuthState, action: AuthActionType ): AuthState => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };


    default:
      return state;
  }
};

// auth Provider
const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};


export const AuthProvider:FC = ({children}) => {
  const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );
  const {data, status} = useSession();
  const router = useRouter();

  console.log('status', status);
  useEffect(() => {
    if ( status === 'authenticated' ) {
      dispatch({type: AUTH, payload: data?.user as IUser});
    }
  }, [status, data]);


  // useEffect(() => {
  //     checkToken();
  // }, [])

  const checkToken = async () => {
    if ( !Cookies.get('token') ) {
      return;
    }

    try {
      const {data} = await eivomApi.get('/user/validate-token');
      const {token, user} = data;
      Cookies.set('token', token );
      dispatch({type: AUTH, payload: user});
    } catch (error) {
      Cookies.remove('token');
    }
  };


  const loginUser = async ( email: string, password: string ): Promise<boolean> => {
    try {
      const {data} = await eivomApi.post('/user/login', {email, password});
      const {token, user} = data;
      Cookies.set('token', token );
      dispatch({type: AUTH, payload: user});
      return true;
    } catch (error) {
      return false;
    }
  };


  const registerUser = async ( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {
    try {
      const {data} = await eivomApi.post('/user/register', {name, email, password});
      const {token, user} = data;
      Cookies.set('token', token );
      dispatch({type: AUTH, payload: user});
      return {
        hasError: false,
      };
    } catch (error) {
      if ( axios.isAxiosError(error) ) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo',
      };
    }
  };


  const logout = () => {
    Cookies.remove('cart');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');

    signOut();
    // router.reload();
    // Cookies.remove('token');
  };


  return (
    <AuthContext.Provider value={{
      ...state,

      // Methods
      loginUser,
      registerUser,
      logout,
    }}>
      { children }
    </AuthContext.Provider>
  );
};
