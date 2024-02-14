
import {Navbar} from "../navbar/navbar.tsx";
import {NavLink,useNavigate} from "react-router-dom";
import {AiOutlineGoogle} from 'react-icons/ai';
import { useFormik } from "formik";
import {useSignIn} from 'react-auth-kit';
import 'alertifyjs/build/css/alertify.css';
import { identityServerApi } from "../../utilties/identityServerApi.tsx";




import "./login.css";
import { loginSchema } from "../../schemas/index.tsx";
import LoginLayout from "../layouts/RequireAuth.tsx";

export const Login = ()=>{
    
    const signIn = useSignIn();
    const navigate = useNavigate();
    const loginFormik  = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:loginSchema,
        onSubmit: async ()=>{
            
            const result:any =await identityServerApi.login(loginFormik.values.email,loginFormik.values.password);
            console.log(result);
            console.log(result);
            var user:any;
            await identityServerApi.getUserInfoByToken(result.data.access_token).then((x:any)=>{user=x.data});
             if(signIn({
                token: result.data.access_token,
                expiresIn:result.data.expires_in,
                tokenType: result.data.token_type,
                refreshToken:result.data.refresh_token,
                refreshTokenExpireIn:(60*60*24),
                authState: {email:loginFormik.values.email}})
                ){navigate("/");}else{
                    
                };
                
            }})
            
    
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
                    <input type="text" value={loginFormik.values.email} name="email" onChange={loginFormik.handleChange} className="form-control border-dark" id="emailInput" placeholder="name@example.com" />
                    <div className="text-danger d-flex my-0 py-1">{loginFormik.errors.email&&loginFormik.errors.email}</div>
                    <label className="d-flex my-0 py-1">Password</label>
                    <input value={loginFormik.values.password} name="password" onChange={loginFormik.handleChange} type="password" className="form-control border-dark" id="passwordInput" placeholder="Password" />
                    <div className="text-danger d-flex my-0 py-1">{loginFormik.errors.password&&loginFormik.errors.password}</div>
            <button disabled={loginFormik.isSubmitting} type="submit" className="btn btn-dark mt-3 w-100">Log In</button>
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