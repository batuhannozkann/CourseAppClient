import { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { Course } from "./course";
import { FaStar } from "react-icons/fa";
import useApi from "../../utilties/OcelotApi";
import Cookies from 'js-cookie'
import LoginLayout from "../layouts/loginLayout";

export const SaleCourses = ()=>{
  const {sendRequest} = useApi();
  const [courses,setCourses] = useState<CourseDto[]>([]); 
  const [counter,setCounter] = useState(0);
  useEffect(()=>{
    if(counter==0)
    {
      sendRequest('get','catalog','course').then((x:any)=>{
        x.data.map((x:CourseDto)=>{
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
    categoryName: x.category?.name,
    ratings: Array(4).fill(0).map((_, index) => <i key={index} className="fa fa-star"><FaStar /></i>),
    description: x.description,
    price: x.price,
  })) || [];
      return(
        <LoginLayout>
        <Layout>
          <Course cardData ={cardData}></Course>
        </Layout>
        </LoginLayout>
        
      )
    
}