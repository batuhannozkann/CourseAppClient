import React,{useState} from "react";
import {Navbar} from '../navbar/navbar.tsx';
import {Header} from '../header/header.tsx';
import {Card} from "../../common/card.tsx";
import  "./mainpage.css"
import Cookies from 'js-cookie'

export const MainPage = ()=>{
   
    return(
        <>
        <Navbar/>
        <Header/>
        <div className="row d-flex justify-content-center cardSection">     
        <Card/>
        <Card/>
        <Card/>
        </div>
        <div className="my-5 d-flex justify-content-center">
            <a className="btn btn-outline-dark">View All</a>
        </div>
        
        </>
    )
}