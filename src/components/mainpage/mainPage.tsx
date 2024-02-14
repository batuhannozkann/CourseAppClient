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
import { Loading } from "../../utilties/loading.tsx";

export const MainPage = ()=>{
    const {sendRequest} = useApi();
    const [courses,setCourses]:any = useState();
    const isAuthenticated = useIsAuthenticated();
    useEffect(()=>{
        isAuthenticated()?sendRequest('get','catalog','course',{},"GetAllCourseAccordingToUser").then((x:any)=>{setCourses(x.data);console.log(x);}):sendRequest('get','catalog','course').then((x:any)=>{setCourses(x.data)});
    },[])
    if(!courses)
    {
        return (
            <Layout>
            <Loading></Loading>
            </Layout>
        )
    }
    return(
        <>
        <Layout>
        <Header/>
        <div className="row cardSection">     
                <Card  courses={courses}></Card>
        </div>
        <div className="my-5 d-flex justify-content-center">
            <a className="btn btn-outline-dark">View All</a>
        </div>
        </Layout>
        </>
    )
}