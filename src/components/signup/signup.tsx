import react from "react";
import {Navbar} from "../navbar/navbar.tsx";
import {NavLink} from "react-router-dom";
import {AiOutlineGoogle} from 'react-icons/ai';
import "./signup.css";

export const SignUp = ()=>{

return(
        <>
        <div className="">
        <Navbar />
        <div className="d-flex justify-content-center">
            <div className="col-lg-3 col-10 my-5 text-center border border-dark p-5">
                <div className="h3">Sign Up</div>
                <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, cumque?</div>
                <form>
                    <label className="d-flex my-0 py-1">Full Name</label>
                    <input type="text" className="form-control border-dark" id="exampleFormControlInput1" placeholder="Name" />
                    <label className="d-flex my-0 py-1">Email</label>
                    <input type="email" className="form-control border-dark" id="exampleFormControlInput1" placeholder="name@example.com" />
                    <label className="d-flex my-0 py-1">Password</label>
                    <input type="password" className="form-control border-dark" id="exampleFormControlInput1" placeholder="Password" />
                    <label className="d-flex my-0 py-1">Re-password</label>
                    <input type="password" className="form-control border-dark" id="exampleFormControlInput1" placeholder="Password" />
                    <button className="btn btn-dark w-100 mt-3">Sign Up</button>
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