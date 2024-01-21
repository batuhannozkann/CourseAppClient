import {useState } from 'react';
import axios from 'axios';
import {useAuthHeader} from 'react-auth-kit';
import { getDecryptedCookie } from './cookieHelper';

const setApiUrl = (catalog:string, controller:string, action?:string) => {
  const url = `http://localhost:5000/services/${catalog}/${controller}`;
  return action ? `${url}/${action}` : url;
};

const axiosWithAuth = (header?:string) => {
  const instance = axios.create();
  // Her istek öncesi çalışacak olan interceptor
  instance.interceptors.request.use((config) => {
      config.headers.Authorization = `${header}`;
    return config;
  });

  return instance;
};

export const Api:any = {
  get: async (catalog:string, controller:string, data?:any, action?:string,header?:string) => {
    return axiosWithAuth(header)({
      method: 'get',
      url: setApiUrl(catalog, controller, action),
      data: data,
      headers: {
        'content-type': 'application/json'
      }
    }).catch(error => {
      if(error.response.status==401)
      {
        
      }
      console.log(error.response.status);
    });
  },
  file: async (catalog:string, controller:string, data?:any, action?:string,header?:string) => {
    return axiosWithAuth(header)({
      method: 'post',
      url: setApiUrl(catalog, controller, action),
      data: data,
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).catch(error => {
      console.log(error);
    });
  },
  post: async (catalog:string, controller:string, data?:any, action?:string,header?:string) => {
    axiosWithAuth(header)({
      method: 'post',
      url: setApiUrl(catalog, controller, action),
      data: data,
      headers: {
        'content-type': 'application/json',
      }
    }).catch(error => {
      console.log(error);
    });
  },
  delete: async (catalog:string, controller:string, data?:any, action?:string,header?:string) => {
    return axiosWithAuth(header)({
      method: 'delete',
      url: setApiUrl(catalog, controller, action),
      data: data,
      headers: {
        'content-type': 'application/json',
      }
    }).catch(error => {
      console.log(error);
    });
  },
  put: async (catalog:string, controller:string, data?:any, action?:string,header?:string) => {
    return axiosWithAuth(header)({
      method: 'put',
      url: setApiUrl(catalog, controller, action),
      data: data,
      headers: {
        'content-type': 'application/json',
      }
    }).catch(error => {
      console.log(error);
    });
  }
};

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authHeader = useAuthHeader();
  const clientToken = getDecryptedCookie('_cl_tk')

  const sendRequest = async (method:any, catalog:string, controller:string, data?:any, action?:string) => {
    setIsLoading(true);
    setError(null);

    try {
      var response;
      if(authHeader())
      {
         response = await Api[method](catalog, controller, data, action,authHeader());
      }
      else{
         response = await Api[method](catalog, controller, data, action,`Bearer ${clientToken}`);
      }  
      return response.data;
    } catch (error:any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    sendRequest
  };
};

export default useApi;
