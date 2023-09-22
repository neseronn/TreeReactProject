import axios from 'axios';

export const BaseURL = 'http://127.0.0.1:8000/api/v1/';

export const instance = axios.create({
  baseURL: BaseURL,
});
