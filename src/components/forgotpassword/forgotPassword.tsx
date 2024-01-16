import React from "react"
import {NavLink,useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import { identityServerApi } from "../../utilties/identityServerApi";
import { forgotPasswordSchema } from "../../schemas/index.tsx";

export const ForgotPassword = ()=>{
    const navigate = useNavigate();
    const forgotPasswordFormik = useFormik({
    initialValues:
    {email:""},
    validationSchema:forgotPasswordSchema,
    onSubmit:async (values)=>{
      identityServerApi.forgotPassword(values.email,()=>navigate("/login"));
    }
});
    return(
        <div className="d-flex justify-content-center">
            <div className="col-lg-3 col-10 my-5 text-center border border-dark p-5">
                <div className="h3">Forgot Password</div>
                <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, cumque?</div>
                <form onSubmit={forgotPasswordFormik.handleSubmit}>
                    <label className="d-flex my-0 py-1">Email</label>
                    <input value={forgotPasswordFormik.values.email} name="email" type="email" onChange={forgotPasswordFormik.handleChange} className="form-control border-dark" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <div className="text-danger d-flex my-0 py-1">{forgotPasswordFormik.errors.email&&forgotPasswordFormik.errors.email}</div>
                    <button type="submit"  className="btn btn-dark w-100 mt-3">Send</button>
                </form>
                <hr className="my-4"></hr>
                <div className="d-flex flex-column my-2">
                    <span>Do you have an account? <NavLink
                        to="/Login"
                        className="text-dark"
                    >Sign In </NavLink></span>
                </div>
            </div>
        </div>
        )
}