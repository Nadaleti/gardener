import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import store from './store';
import { logoutAction } from './store/reducers/session';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333'
});

axios.interceptors.request.use((request: AxiosRequestConfig) => {
  if (request.url && isAuthenticatedUrl(request.url)) {
    const token = store.getState().token;
    request.headers['Authorization'] = `Bearer ${token}`;
  }

  return request;
});

axios.interceptors.response.use((response: AxiosResponse<any>) => {
  if (response.status === 401) {
    store.dispatch(logoutAction());
  }

  return response;
})

const isAuthenticatedUrl = (url: string) => {
  return !url.includes('/uploads') && !url.includes('/login') && url.includes('/register');
}

export default axiosInstance;
