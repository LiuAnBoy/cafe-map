import axios, { AxiosRequestConfig } from 'axios';

export function getRequest<T>(url: string, params = {}) {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
  };

  return axios.get<T>(url, config);
}
