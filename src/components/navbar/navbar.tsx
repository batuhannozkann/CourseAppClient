import {useEffect,useState} from "react";
import  "./navbar.css"
import { NavLink } from "react-router-dom";
import {useIsAuthenticated} from 'react-auth-kit'
import {useSignOut} from 'react-auth-kit';
import {useAuthUser} from 'react-auth-kit';
import { identityServerApi } from "../../utilties/identityServerApi";
import { setEncryptedCookie, getDecryptedCookie } from '../../utilties/cookieHelper';
import Cookies from 'js-cookie'
import { TiShoppingCart } from "react-icons/ti";
import ShoppingCart from "../basket/shoppingcart";


export const Navbar = ({updateUser}:any)=>{
    
    const isAuthenticated = useIsAuthenticated();
    const authUser:any = useAuthUser();
    const [triggerCart,setTriggerCart] = useState(0);
    const signOut = useSignOut();
    const [user,setUser]:any = useState();
    const isMobile = window.innerWidth <= 1150; 
    
    useEffect(()=>{
        if(!Cookies.get("user")&&isAuthenticated()){
            identityServerApi.getUserInfoFromService(authUser().email).then((x:any)=>{setEncryptedCookie("user",JSON.stringify(x.data.data));setUser(x.data.data)});
        }
        else{
            setUser(JSON.parse(getDecryptedCookie("user")));
        }
    },[updateUser])
    return(
        <>
<nav className="navbar  navbar-expand-lg navbar-dark bg-dark border-dark">
    <div className="container-fluid row m-2">
        <a href="#" className ={`${isMobile?"col-3":"col-1"} logo`}><img className={`navbar-brand h-100 ${isMobile?"w-100":""}`} src="https://firebasestorage.googleapis.com/v0/b/courseapplication-f3e34.appspot.com/o/logo.png?alt=media&token=12ea7708-7c5d-4a44-9860-087135530669"></img></a>
        <button className="navbar-toggler col-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
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
                        Contact
                    </NavLink>
                </li>
            </ul>
            <div className="ms-lg-2 my-sm-2 my-lg-0 d-inline-block">
                <div className="d-flex">
                                {isAuthenticated()?<>
                                        <div className="dropdown">
                                            <NavLink to="#" className="text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={user?.picture} alt="" width="32" height="32" className="rounded-circle me-2" />
                                                <strong>{user?.firstName}</strong>
                                            </NavLink>
                                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                                <li><a style={{cursor:'pointer'}} className="dropdown-item" onClick={()=>{signOut();window.location.reload();Cookies.remove('userInfo');Cookies.remove('user')}}>Sign out</a></li>
                                                <li> <NavLink className="dropdown-item" to="/User/">Account
                                            </NavLink></li>
                                            </ul>
                                        </div>
                                        {isMobile?<div className="ms-3">
                                        <NavLink onClick={()=>{setTriggerCart(triggerCart+1)}} to={isMobile?"/User/Basket":"#"} className="text-white text-decoration-none">
                                        <TiShoppingCart className="text-white" />
                                        </NavLink>
                                        </div>
                                        :
                                        <div className="ms-3 dropdown">
                                        <NavLink onClick={()=>{setTriggerCart(triggerCart+1)}} to="#" className="text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <TiShoppingCart className="text-white" />
                                        </NavLink>
                                        <ul className="dropdown-menu bg-dark">
                                        <li>
                                        <div className="position-relative container-fluid h-100" style={{width:'100vw'}}>
                                        <ShoppingCart trigger={triggerCart}></ShoppingCart>
                                        </div>
                                        
                                        </li>    
                                        </ul></div>}
                                        
                                        
                                        

                                    </>
                                    :<><NavLink
                                        to="/Login"
                                        className={({ isActive, isPending }) => isPending ? "btn btn-sm btn-outline-light ms-2" : isActive ? "btn btn-sm btn-outline-light ms-2" : "btn btn-sm btn-outline-light ms-2"}
                                    >
                                        Login
                                    </NavLink><NavLink
                                        to="/SignUp"
                                        className={({ isActive, isPending }) => isPending ? "btn btn-sm btn-outline-light ms-2" : isActive ? "btn btn-sm btn-outline-light ms-2" : "btn btn-sm btn-outline-light ms-2"}
                                    >
                                        Sign Up
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
