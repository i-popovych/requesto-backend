import axios from 'axios';

const AxiosGlobalConfig = (url: string, accessToken: string) => {
  function handleSuccess(response) {
    return response.data;
  }

  function handleError(error) {
    return error;
  }

  const instance = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  instance.interceptors.response.use(handleSuccess, handleError);

  return instance;
};

const axiosInstance = (url: string, accessToken: string) => {
  return AxiosGlobalConfig(url, accessToken);
};
export default axiosInstance;
