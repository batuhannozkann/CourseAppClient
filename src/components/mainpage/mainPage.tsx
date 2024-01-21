import React,{useEffect, useState} from "react";
import {Navbar} from '../navbar/navbar.tsx';
import {Header} from '../header/header.tsx';
import {Card} from "../../common/card.tsx";
import  "./mainpage.css"
import Cookies from 'js-cookie'
import Layout from "../layouts/layout.tsx";
import { identityServerApi } from "../../utilties/identityServerApi.tsx";
import { setEncryptedCookie } from "../../utilties/cookieHelper.tsx";

export const MainPage = ()=>{
    useEffect(()=>{
        identityServerApi.getClientToken().then((x:any)=>setEncryptedCookie('_cl_tk',x.data.access_token));
    },[])
    return(
        <>
        <Layout>
        <Header/>
        <div className="row d-flex justify-content-start cardSection">     
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        </div>
        <div className="my-5 d-flex justify-content-center">
            <a className="btn btn-outline-dark">View All</a>
        </div>
        </Layout>
        
        </>
    )
}