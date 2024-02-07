// Layout component (Layout.js)
import React, { useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';
import { useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';


const RequireAuth = ({ children }:any) => {
const isAuthenticated = useIsAuthenticated();
const navigate = useNavigate();
useEffect(()=>{
    if (isAuthenticated()) {
    } else {
      navigate('/login'); 
    }
},[])

    return(
        <>
        {children}
        </>
        
    )
};

export default RequireAuth;