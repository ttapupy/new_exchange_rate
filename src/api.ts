import axios from 'axios';


export const frankfurterApi = axios.create();


frankfurterApi.interceptors.request.use(async (config: any) => {
  config.baseURL = 'https://api.frankfurter.app/'
  return config;
}, (error: any) => Promise.reject(error));