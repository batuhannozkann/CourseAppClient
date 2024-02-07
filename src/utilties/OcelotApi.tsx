import {useState } from 'react';
import axios from 'axios';
import {useAuthHeader, useIsAuthenticated} from 'react-auth-kit';
import { getDecryptedCookie, setEncryptedCookie } from './cookieHelper';
import Cookies from 'js-cookie'
import { identityServerApi } from './identityServerApi';

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
     console.log(error);
      
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
    return axiosWithAuth(header)({
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
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  var expiresDate = new Date();
  const sendRequest = async (method:any, catalog:string, controller:string, data?:any, action?:string) => {
    setIsLoading(true);
    setError(null);
    try {
      var response;
      const tokenData =await identityServerApi.getClientToken()
      if(authHeader())
      {
         response = await Api[method](catalog, controller, data, action,authHeader());
      }
      else if(!Cookies.get('_cl_tk')){
         response = await Api[method](catalog, controller, data, action,`Bearer ${tokenData.data.access_token}`);
         expiresDate.setTime(expiresDate.getTime() + (1 * 60*60*1000 ));
         setEncryptedCookie('_cl_tk',tokenData.data.access_token,expiresDate)
      }
      else if(Cookies.get('_cl_tk')){
        const token =getDecryptedCookie('_cl_tk');
        response = await Api[method](catalog, controller, data, action,`Bearer ${token}`);
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
