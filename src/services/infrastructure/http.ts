import axios, { AxiosRequestConfig } from 'axios';

class Http {
  private config: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  public getRequest<T>(url: string, params = {}) {
    this.config.params = params;
    return axios.get<T>(url, this.config);
  }
}

export default Http;
