import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChildrenProps, LoginData, RegisterData, Usuario } from '../interfaces/app';
import { authReducer, AuthState } from '../reducers/authReducer';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (registerData: RegisterData) => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInicialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    /*    const token = await AsyncStorage.getItem('token');

    // No token, no autenticado
    if (!token) return dispatch({ type: 'notAuthenticated' });

    // Hay token
    const resp = await cafeApi.get('/auth');
    if (resp.status !== 200) {
      return dispatch({ type: 'notAuthenticated' });
    }

    await AsyncStorage.setItem('token', resp.data.token);
    dispatch({
      type: 'signUp',
      payload: {
        token: resp.data.token,
        user: resp.data.usuario,
      },
    });*/
  };

  const signIn = async ({ email, password }: LoginData) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(value => {
        console.log('login success', value);
        /*dispatch({
            type: 'signUp',
            payload: {
              token: value.user.refreshToken,
              user: value.user ,
            },
          });
    
        AsyncStorage.setItem('token', value.user.refreshToken);*/
      })
      .catch(err =>
        dispatch({
          type: 'addError',
          payload: err.message || 'Información incorrecta',
        })
      );

    /*try {
      const { data } = await cafeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });

      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Información incorrecta',
      });
    }*/
  };

  const signUp = async ({ nombre, correo, password }: RegisterData) => {
    /*try {
      const { data } = await cafeApi.post<LoginResponse>('/usuarios', {
        correo,
        password,
        nombre,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });

      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Revise la información',
      });
    }*/
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'logout' });
  };

  const removeError = () => {
    dispatch({ type: 'removeError' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
