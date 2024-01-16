
import axios from "axios";
import { AlertifyLibrary } from "./Alertify";
import { getClientConfig } from './clientConfig';
import { getParameterByName } from "./getParameterByName";
import { NotificationPosition } from "./Alertify";
import Cookies from 'js-cookie';


const identityServerUrl = "http://localhost:5001";
export const identityServerApi = {
    login: async (email:string,password:string)=>{
        return await axios({
            method: 'post',
            url: `${identityServerUrl}/connect/token`,
            data:getClientConfig.clientConfigWithUsername(email,password),
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          })
        .catch(error=>{
            AlertifyLibrary.AlertifyAlert('Login error',error.response.data.error);
            console.log(error)});
    },
    signup: (fullName: string, email: string, password: string, callbackFunction: () => void) => {
        axios.post(
          `${identityServerUrl}/api/User/Register`,
          { FullName: fullName, UserName: email, Email: email, Password: password, City: "Istanbul" },
        )
          .then(() => {
            axios.get(`http://localhost:5001/api/User/GenerateToken?email=${email}`)
              .then(() => {
                AlertifyLibrary.AlertifySuccess('Kayıt işleminiz başarıyla oluşmuştur.Lütfen emailinizi doğrulayınız.',NotificationPosition.topCenter);callbackFunction(); // callbackFunction'ı burada çağırın
              })
              .catch(err => {
                console.log(err.response.data);
                AlertifyLibrary.AlertifyAlert('Generate Token Error', err.response.data.errors[1]);
              });
          })
          .catch(err => {
            console.log(err.response.data);
            AlertifyLibrary.AlertifyAlert('SignUp Error', err.response.data.errors[1]);
          });
      },
      forgotPassword:async (email:string,callbackFunction:()=>void)=>{
        await axios.get(`${identityServerUrl}/api/User/GenerateResetPasswordToken?email=${email}`)
        .then(()=>{AlertifyLibrary.AlertifySuccess('Şifre sıfırlama linki mailinize gönderilmiştir.',NotificationPosition.topCenter);callbackFunction();})
        .catch(error=>{AlertifyLibrary.AlertifyAlert('Forgot Password Error',error.response.data.error);
        console.log(error)});
      },
      resetPassword:(password:string,callbackFunction:()=>void)=>{
        axios.post(`${identityServerUrl}/api/User/ResetPassword`,{Token:getParameterByName('token'),Email:getParameterByName('email'),Password:password})
            .then(()=>{AlertifyLibrary.AlertifySuccess('Şifreniz sıfırlanmıştır.',NotificationPosition.topCenter);callbackFunction()})
            .catch( error=>{AlertifyLibrary.AlertifyAlert('Reset Password Error',error.response.data.error);
            console.log(error)});
      },
      getTokenByRefreshToken:async (token:string)=>
      {
          var refreshTokenData:any;
         await axios({
          method: 'post',
          url: `${identityServerUrl}/connect/token`,
          data:getClientConfig.clientConfigWithRefreshToken(token),
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then((x)=>{refreshTokenData=x})
      .catch(error=>{
          console.log(error)});
          return refreshTokenData;
      },
      getUserInfo:async ()=>{
        
       var userInfo = await axios({
          method: 'get',
          url: `${identityServerUrl}/connect/userinfo`,
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': `${Cookies.get('_auth_type')} ${Cookies.get('_auth')}`
          }
        }).then()
      .catch(error=>{
          console.log(error)
        })
        return userInfo;
      },
      getUserInfoByToken:async (token:string)=>{
        
        var userInfo = await axios({
           method: 'get',
           url: `${identityServerUrl}/connect/userinfo`,
           headers: {
             'content-type': 'application/x-www-form-urlencoded',
             'Authorization': `Bearer ${token}`
           }
         }).then()
       .catch(error=>{
           console.log(error)
         })
         return userInfo;
       }
}