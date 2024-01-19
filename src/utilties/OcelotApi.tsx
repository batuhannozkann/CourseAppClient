import axios from 'axios'
import { useAuthUser } from 'react-auth-kit';
import { useAuthHeader } from 'react-auth-kit'
import { AlertifyLibrary } from './Alertify';
import Cookies from 'js-cookie';

const setApiUrl = (catalog:string, controller:string, action?:string) => {
    const url = `http://localhost:5000/services/${catalog}/${controller}`;
    return action ? `${url}/${action}` : url;
}
const axiosWithAuth = () => {
  const instance = axios.create();
  // Her istek öncesi çalışacak olan interceptor
  instance.interceptors.request.use((config) => {
    
    const token = Cookies.get('_auth');
    if (token) {
      config.headers.Authorization = `${Cookies.get('_auth_type')} ${Cookies.get('_auth')}`}
    return config;
  });

  return instance;
};

export default axiosWithAuth;


export const Api = {

    get:async (catalog:string,controller:string,data?:any,action?:string)=>{
        return axiosWithAuth()({
            method: 'get',
            url: `${setApiUrl(catalog,controller,action)}`,
            data:data,
            headers: {
              'content-type': 'application/json'
            }
          })
        .catch(error=>{
            console.log(error)});
    },
    file: async (catalog:string,controller:string,data?:any,action?:string)=>{
        return axiosWithAuth()({
            method: 'post',
            url: `${setApiUrl(catalog,controller,action)}`,
            data:data,
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
        .catch(error=>{
            console.log(error)});
    },
    post:async (catalog:string,controller:string,data?:any,action?:string)=>{
        axiosWithAuth()({
            method: 'post',
            url: `${setApiUrl(catalog,controller,action)}`,
            data:data,
            headers: {
                'content-type': 'application/json',
            }
          })
        .catch(error=>{
            AlertifyLibrary.AlertifyAlert('Login error',error.response.data.error);
            console.log(error)});
    },
    delete:async (catalog:string,controller:string,data?:any,action?:string)=>{
        return axiosWithAuth()({
            method: 'delete',
            url: `${setApiUrl(catalog,controller,action)}`,
            data:data,
            headers: {
                'content-type': 'application/json',
            }
          })
        .catch(error=>{
            console.log(error)});
    },
    put:async (catalog:string,controller:string,data:any,action?:string)=>{
        return axiosWithAuth()({
            method: 'put',
            url: `${setApiUrl(catalog,controller,action)}`,
            data:data,
            headers: {
                'content-type': 'application/json',
            }
          })
        .catch(error=>{
            console.log(error)});
    }
}
