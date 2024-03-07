import {useEffect, useState} from "react";
import {Header} from '../header/header.tsx';
import {Card} from "../../common/card.tsx";
import  "./mainpage.css"
import Layout from "../layouts/layout.tsx";
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
                <div className="d-flex justify-content-center text-danger mt-5">Servers may be slow because they are free, wait a bit for loading</div>
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
        </Layout>
        </>
    )
}