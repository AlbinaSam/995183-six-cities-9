import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { StorageKeyName } from '../consts';
import { getItem } from './storage-service';

export const BASE_URL = 'https://9.react.pages.academy/six-cities';

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getItem(StorageKeyName.AuthToken);

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
