import react,{ChangeEvent,MouseEvent, useState} from "react";
import {Navbar} from "../navbar/navbar.tsx";
import {NavLink,useNavigate} from "react-router-dom";
import {AiOutlineGoogle} from 'react-icons/ai';
import axios from "axios";
import { clientConfig } from "../../utilties/clientConfig.tsx";
import { useFormik } from "formik";
import  {useSignIn}  from 'react-auth-kit';

import "./login.css";

export const Login = ()=>{
    const loginFormik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        onSubmit:async ()=>{
            await loginHandler();
        }
    });
    const navigate = useNavigate();
    const signIn = useSignIn();
    const loginHandler = async ()=>{
       
            await axios({
                method: 'post',
                url: 'http://localhost:5001/connect/token',
                data:clientConfig(loginFormik.values.email,loginFormik.values.password),
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                }
              }).then(x=>{
                signIn({
                token: x.data.access_token,
                expiresIn:x.data.expires_in,
                tokenType: x.data.token_type,
                authState: {email:loginFormik.values.email},
                });
                navigate("/");
                
            })
            .catch(error=>{console.log("Giriş Yapılamadı")});
        }
              
    
    return(
        <>
        <div className="">
        <Navbar/>
        <div className="d-flex justify-content-center">
        <div className="col-lg-3 col-9 my-5 text-center border border-dark p-5">
            <div className="h3">Log In</div>
            <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, cumque?</div>
            <form onSubmit={loginFormik.handleSubmit}>
            <label className="d-flex my-0 py-1">Email</label>
                    <input type="text" value={loginFormik.values.email} name="email" onChange={loginFormik.handleChange} className="form-control border-dark" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <label className="d-flex my-0 py-1">Password</label>
                    <input value={loginFormik.values.password} name="password" onChange={loginFormik.handleChange} type="password" className="form-control border-dark" id="exampleFormControlInput1" placeholder="Password" />
            <button type="submit" className="btn btn-dark mt-3 w-100">Log In</button>
            </form>
            <hr className="my-4"></hr>
            <div> 
                    <NavLink
                        to="/"
                        className="btn btn-outline-dark w-100"
                        >
                        <AiOutlineGoogle className="mb-1 me-1"/> Log in with Google
                    </NavLink>
            </div>
            <div className="d-flex flex-column my-2">
                    <NavLink
                        to="/ForgotPassword"
                        className="text-dark"
                        >
                    Forgot your password?
                    </NavLink>
                    <span>Don't have an account? <NavLink
                        to="/SignUp"
                        className="text-dark"
                        >Sign Up </NavLink></span>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}