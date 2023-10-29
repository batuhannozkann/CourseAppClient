import React from "react";
import  "./navbar.css"
import { NavLink } from "react-router-dom";
import {useIsAuthenticated} from 'react-auth-kit';
import {useAuthUser} from 'react-auth-kit'
import { useSignOut } from 'react-auth-kit'

export const Navbar = ()=>{
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    console.log(isAuthenticated());
    return(
        <>
<nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-dark">
    <div className="container-fluid m-2">
        <a href="#" className = "logo"><img className="navbar-brand h-100 w-100" src="src\assets\logo.png"></img></a>
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
                            isPending ? "" : isActive ? "nav-link text-dark mx-lg-3 border-bottom border-dark " : "nav-link text-dark mx-lg-3"
                        }
                        >
                        Anasayfa
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/About"
                        className={({ isActive, isPending }) =>
                            isPending ? "" : isActive ? "nav-link text-dark mx-lg-3 border-bottom border-dark " : "nav-link text-dark mx-lg-3"
                        }
                        >
                        Hakkımızda
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/Services"
                        className={({ isActive, isPending }) =>
                            isPending ? "" : isActive ? "nav-link text-dark mx-lg-3 border-bottom border-dark " : "nav-link text-dark mx-lg-3"
                        }
                        >
                        Hizmetler
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/Contact"
                        className={({ isActive, isPending }) =>
                            isPending ? "" : isActive ? "nav-link text-dark mx-lg-3 border-bottom border-dark " : "nav-link text-dark mx-lg-3"
                        }
                        >
                        İletişim
                    </NavLink>
                </li>
            </ul>
            <div className="ms-lg-2 my-sm-2 my-lg-0 d-inline-block">
                <div className="">
                                {isAuthenticated()?<><button
                                        onClick={(event:React.MouseEvent<HTMLButtonElement>)=>{signOut()}}
                                        className="btn btn-sm btn-outline-dark"
                                    >
                                        Çıkış Yap
                                    </button></>:<><NavLink
                                        to="/Login"
                                        className={({ isActive, isPending }) => isPending ? "btn btn-sm btn-outline-dark" : isActive ? "btn btn-sm btn-outline-dark " : "btn btn-sm btn-outline-dark"}
                                    >
                                        Giriş Yap
                                    </NavLink><NavLink
                                        to="/SignUp"
                                        className={({ isActive, isPending }) => isPending ? "btn btn-sm btn-outline-dark ms-2" : isActive ? "btn btn-sm btn-outline-dark ms-2" : "btn btn-sm btn-outline-dark ms-2"}
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