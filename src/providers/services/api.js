import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'abk-auth-token': token } = parseCookies();

export const appUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: appUrl,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;