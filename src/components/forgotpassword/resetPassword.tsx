import React from "react"
import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { getParameterByName } from "../../utilties/getParameterByName";
export const ResetPassword = () => {
    const navigate = useNavigate();
    const forgotPasswordFormik = useFormik({
        initialValues:{
            password:"",
            rePassword:""
        },
        onSubmit:async (values)=>{
            axios.post(`http://localhost:5001/api/User/ResetPassword`,{Token:getParameterByName('token'),Email:getParameterByName('email'),Password:values.password})
            .then(()=>{navigate("/Login")})
            .catch(err=>console.log(err));
        }
    });
    return(
        <div className="d-flex justify-content-center">
            <div className="col-lg-3 col-10 my-5 text-center border border-dark p-5">
                <div className="h3">Reset Password</div>
                <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, cumque?</div>
                <form onSubmit={forgotPasswordFormik.handleSubmit}>
                    <label className="d-flex my-0 py-1">Password</label>
                    <input value={forgotPasswordFormik.values.password} name="password" type="password" onChange={forgotPasswordFormik.handleChange} className="form-control border-dark" id="exampleFormControlInput1" placeholder="" />
                    <label className="d-flex my-0 py-1">Re-password</label>
                    <input value={forgotPasswordFormik.values.rePassword} name="rePassword" type="password" onChange={forgotPasswordFormik.handleChange} className="form-control border-dark" id="exampleFormControlInput1" placeholder="" />
                    <button type="submit"  className="btn btn-dark w-100 mt-3">Send</button>
                </form>
                <hr className="my-4"></hr>
            </div>
        </div>
        )
}