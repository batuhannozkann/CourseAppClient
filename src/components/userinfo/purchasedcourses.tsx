import { useEffect } from "react";
import { Navbar } from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { Course } from "./course";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import {Api} from '../../utilties/OcelotApi'
import Layout from "../layouts/layout";

export const PurchasedCourses = ()=>{
  const [courses,setCourses] = useState<CourseDto[]>([]); 
  const [counter,setCounter] = useState(0);
  useEffect(()=>{
    if(counter==0)
    {
      Api.get('catalog','course').then((x:any)=>{
        x.data.data.map((x:CourseDto)=>{
          setCourses(prev=>[...prev,x]);
        })
      });
      setCounter(counter+1);
    }
  },[]);
  const cardData = courses?.map((x: CourseDto) => ({
    id:x.id,
    imageUrl: x.picture,
    name: x.name,
    categoryName: x.category?.name, // Eğer Category undefined ise bu hatayı önler
    ratings: Array(4).fill(0).map((_, index) => <i key={index} className="fa fa-star"><FaStar /></i>),
    description: x.description,
    price: x.price,
  })) || [];
      return(
        <Layout>
          <Course cardData={cardData}></Course>
        </Layout>
        
      )
    
}