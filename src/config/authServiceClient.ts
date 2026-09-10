import axios from 'axios';
import { ApiPath } from 'enums/ApiPath';

export const authServiceClient = axios.create({
  baseURL: ApiPath.auth,
  timeout: 10 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
