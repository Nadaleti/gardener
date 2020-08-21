import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import store from './store';
import { logoutAction } from './store/reducers/session';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333'
});

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  if (request.url && isAuthenticatedUrl(request.url)) {
    const token = store.getState().token;
    request.headers['Authorization'] = `Bearer ${token}`;
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.log(error.response.data);
      store.dispatch(logoutAction());
    }
  }
);

const isAuthenticatedUrl = (url: string) => {
  return !url.includes('/uploads') && !url.includes('/login') && !url.includes('/register') && !url.includes('/plant-type');
}

export default axiosInstance;
