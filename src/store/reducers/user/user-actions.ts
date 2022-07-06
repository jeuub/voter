import { AppDispatch } from "@store";
import { baseURL } from "@consts";
import { UserAuthorizationType, UserType } from '@consts';
import { userSlice } from './user-slice';
import axios from "axios";

export const register = (userData: UserAuthorizationType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetching())
    const response: { data: UserType & { token: string } } = await axios.post(`${baseURL}/api/auth/register`, userData)
    localStorage.setItem('token', response.data.token);
    dispatch(userSlice.actions.userFetchingSuccess({ user: response.data }))
  } catch (e) {
    let message = 'Ошибка авторизации. Имя уже занято';
    if (e instanceof Error) message = e.message;
    dispatch(userSlice.actions.userFetchingError({ message }))
  }
};



export const login = (userData: UserAuthorizationType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetching())
    const response: { data: UserType & { token: string } } = await axios.post(`${baseURL}/api/auth/login`, userData)
    localStorage.setItem('token', response.data.token);
    dispatch(userSlice.actions.userFetchingSuccess({ user: response.data }))
  } catch (e) {
    let message = 'Ошибка авторизации. Проверьте введеные данные';
    if (e instanceof Error) message = e.message;
    dispatch(userSlice.actions.userFetchingError({ message }))
  }
};

export const loginAdmin = (userData: UserAuthorizationType) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetching())
    const response: { data: UserType & { token: string } } = await axios.post(`${baseURL}/api/admin/login`, userData)
    localStorage.setItem('token', response.data.token);
    dispatch(userSlice.actions.userFetchingSuccess({ user: { ...response.data, admin: true } }))
  } catch (e) {
    let message = 'Ошибка авторизации. Проверьте введеные данные';
    if (e instanceof Error) message = e.message;
    dispatch(userSlice.actions.userFetchingError({ message }))
  }
};