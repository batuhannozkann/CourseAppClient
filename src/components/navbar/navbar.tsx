import React ,{useEffect,useState} from "react";
import  "./navbar.css"
import { NavLink } from "react-router-dom";
import {useIsAuthenticated} from 'react-auth-kit'
import {useSignOut} from 'react-auth-kit';
import {useAuthUser} from"react-auth-kit";
import Cookies from 'js-cookie';

export const Navbar = ()=>{
    
    const isAuthenticated = useIsAuthenticated();
    const authUser = useAuthUser();
    const signOut = useSignOut();
    if(isAuthenticated()){
        console.log(authUser());
    }
    return(
        <>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark border-dark">
    <div className="container-fluid m-2">
        <a href="#" className = "logo"><img className="navbar-brand h-100 w-100" src="/src/assets/logo.png"></img></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="col-11 me-5">
        <div className="collapse navbar-collapse d-lg-flex justify-content-end" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink
                        to="/"
                        className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "nav-link text-white mx-lg-3 border-bottom border-dark " : "nav-link text-white mx-lg-3"
                        }
                        >
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/User/PurchasedCourses"
                        className={({ isActive, isPending }) =>
                            isPending ? "" : isActive ? "nav-link text-white mx-lg-3 border-bottom border-dark " : "nav-link text-white mx-lg-3"
                        }
                        >
                        Courses(Purchased)
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/User/SaleCourses"
                        className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "nav-link text-white mx-lg-3 border-bottom border-dark " : "nav-link text-white mx-lg-3"
                        }
                        >
                        Courses(On sale)
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/Contact"
                        className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "nav-link text-white mx-lg-3 border-bottom border-dark " : "nav-link text-white mx-lg-3"
                        }
                        >
                        İletişim
                    </NavLink>
                </li>
            </ul>
            <div className="ms-lg-2 my-sm-2 my-lg-0 d-inline-block">
                <div className="">
                                {isAuthenticated()?<>
                                        <div className="dropdown">
                                            <NavLink to="#" className="text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                                                <strong>{authUser()?.fullname}</strong>
                                            </NavLink>
                                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                                <li><a style={{cursor:'pointer'}} className="dropdown-item" onClick={()=>{signOut();Cookies.remove('userInfo');}}>Sign out</a></li>
                                                <li> <NavLink className="dropdown-item" to="/User/">Account
                                            </NavLink></li>
                                            </ul>
                                        </div>

                                    </>
                                    :<><NavLink
                                        to="/Login"
                                        className={({ isActive, isPending }) => isPending ? "btn btn-sm btn-outline-light ms-2" : isActive ? "btn btn-sm btn-outline-light ms-2" : "btn btn-sm btn-outline-light ms-2"}
                                    >
                                        Giriş Yap
                                    </NavLink><NavLink
                                        to="/SignUp"
                                        className={({ isActive, isPending }) => isPending ? "btn btn-sm btn-outline-light ms-2" : isActive ? "btn btn-sm btn-outline-light ms-2" : "btn btn-sm btn-outline-light ms-2"}
                                    >
                                            Kayıt Ol
                                    </NavLink></>}
                </div>
            </div>
        </div>
        </div>
    </div>
</nav>

        </>
        
        )
}