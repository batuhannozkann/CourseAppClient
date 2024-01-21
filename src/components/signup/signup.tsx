
import {Navbar} from "../navbar/navbar.tsx";
import {NavLink} from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { signUpSchema } from "../../schemas/index.tsx";
import { identityServerApi } from "../../utilties/identityServerApi.tsx";
export const SignUp = ()=>{
const navigate = useNavigate();
const signUpFormik = useFormik({
    initialValues:
    {firstname:"",
    lastname:"",
    email:"",
    password:"",
    rePassword:""},
    validationSchema:signUpSchema,
    onSubmit:(values)=>{
        submitHandler(values.firstname,values.lastname,values.email,values.password);
    }
});
const submitHandler = (firstname:string,lastname:string,email:string,password:string)=>{
    identityServerApi.signup(firstname,lastname,email,password,()=>{return navigate('/login')});
}
return(
        <>
        <div className="">
        <Navbar />
        <div className="d-flex justify-content-center">
            <div className="col-lg-3 col-10 my-5 text-center border border-dark p-5">
                <div className="h3">Sign Up</div>
                <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, cumque?</div>
                <form onSubmit={signUpFormik.handleSubmit}>
                    <label className="d-flex my-0 py-1">First Name</label>
                    <input value={signUpFormik.values.firstname} name="firstname" onChange={signUpFormik.handleChange} type="text" className="form-control border-dark" id="exampleFormControlInput1" placeholder="Name" />
                    <div className="text-danger d-flex my-0 py-1">{signUpFormik.errors.firstname&&signUpFormik.errors.firstname}</div>
                    <label className="d-flex my-0 py-1">Last Name</label>
                    <input value={signUpFormik.values.lastname} name="lastname" onChange={signUpFormik.handleChange} type="text" className="form-control border-dark" id="exampleFormControlInput1" placeholder="Name" />
                    <div className="text-danger d-flex my-0 py-1">{signUpFormik.errors.lastname&&signUpFormik.errors.lastname}</div>
                    <label className="d-flex my-0 py-1">Email</label>
                    <input value={signUpFormik.values.email} name="email" type="email" onChange={signUpFormik.handleChange} className="form-control border-dark" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <div className="text-danger d-flex my-0 py-1">{signUpFormik.errors.email&&signUpFormik.errors.email}</div>
                    <label className="d-flex my-0 py-1">Password</label>
                    <input type="password" value={signUpFormik.values.password} name="password" onChange={signUpFormik.handleChange} className="form-control border-dark" id="exampleFormControlInput1" placeholder="Password" />
                    <div className="text-danger d-flex my-0 py-1">{signUpFormik.errors.password&&signUpFormik.errors.password}</div>
                    <label className="d-flex my-0 py-1">Re-password</label>
                    <input type="password" value={signUpFormik.values.rePassword} name="rePassword" onChange={signUpFormik.handleChange} className="form-control border-dark" id="exampleFormControlInput1" placeholder="Password" />
                    <div className="text-danger d-flex my-0 py-1">{signUpFormik.errors.rePassword&&signUpFormik.errors.rePassword}</div>
                    <button type="submit"  className="btn btn-dark w-100 mt-3">Sign Up</button>
                </form>
                <hr className="my-4"></hr>
                <div className="d-flex flex-column my-2">
                    <NavLink
                        to="/ForgotPassword"
                        className="text-dark"
                    >
                        Forgot your password?
                    </NavLink>
                    <span>Do you have an account? <NavLink
                        to="/Login"
                        className="text-dark"
                    >Sign In </NavLink></span>
                </div>
            </div>
        </div>
    </div>
        </>
        )
}