import React,{useEffect, useState} from "react";
import {Navbar} from '../navbar/navbar.tsx';
import {Header} from '../header/header.tsx';
import {Card} from "../../common/card.tsx";
import  "./mainpage.css"
import Cookies from 'js-cookie'
import Layout from "../layouts/layout.tsx";
import { identityServerApi } from "../../utilties/identityServerApi.tsx";
import { setEncryptedCookie } from "../../utilties/cookieHelper.tsx";
import useApi from "../../utilties/OcelotApi.tsx";
import { useIsAuthenticated } from "react-auth-kit";

export const MainPage = ()=>{
    const {sendRequest} = useApi();
    const [courses,setCourses]:any = useState();
    const isAuthenticated = useIsAuthenticated();
    useEffect(()=>{
        isAuthenticated()?sendRequest('get','catalog','course',{},"GetAllCourseAccordingToUser").then((x:any)=>{setCourses(x.data);console.log(x);}):sendRequest('get','catalog','course').then((x:any)=>{setCourses(x.data)});
    },[])
    return(
        <>
        <Layout>
        <Header/>
        <div className="row d-flex justify-content-start cardSection">     
        {courses?.map((x:any)=>{
            return(<Card key={x.id} course= {x}></Card>)
        })}
        </div>
        <div className="my-5 d-flex justify-content-center">
            <a className="btn btn-outline-dark">View All</a>
        </div>
        </Layout>
        </>
    )
}