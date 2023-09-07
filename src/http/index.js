import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000,
});


instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);


instance.interceptors.response.use(
  (response) => {

    return response.data;
  },
  (error) => {


    return Promise.reject(error);
  }
);


export default {
  get(url, params = {}) {
    return instance.get(url, { params });
  },
  post(url, data = {}) {
    return instance.post(url, data);
  },
};
