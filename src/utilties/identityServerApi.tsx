import react,{ChangeEvent,MouseEvent, useState} from "react";
import axios from "axios";
import  {useSignIn}  from 'react-auth-kit';
import { AlertifyLibrary } from "./Alertify";
import { clientConfig } from './clientConfig';
import {useNavigate} from "react-router-dom";

export const identityServerApi = {
    login: async (email:string,password:string)=>{
        return await axios({
            method: 'post',
            url: 'http://localhost:5001/connect/token',
            data:clientConfig(email,password),
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
          'http://localhost:5001/api/User/Register',
          { FullName: fullName, UserName: email, Email: email, Password: password, City: "Istanbul" },
        )
          .then(() => {
            axios.get(`http://localhost:5001/api/User/GenerateToken?email=${email}`)
              .then(() => {
                callbackFunction(); // callbackFunction'ı burada çağırın
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
      }
}