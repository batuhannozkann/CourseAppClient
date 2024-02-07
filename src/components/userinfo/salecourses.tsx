import { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { Course } from "./course";
import { FaStar } from "react-icons/fa";
import useApi from "../../utilties/OcelotApi";
import Cookies from 'js-cookie'
import RequireAuth from "../layouts/RequireAuth";
import { getDecryptedCookie } from "../../utilties/cookieHelper";
import { useIsAuthenticated } from "react-auth-kit";
import { Loading } from "../../utilties/loading";


export const SaleCourses = ()=>{
  const [courses,setCourses] = useState<CourseDto[]>([]); 
  const [counter,setCounter] = useState(0);
  const [user,setUser] = useState(getDecryptedCookie('user'));
  const isAuthenticated = useIsAuthenticated();
  if(isAuthenticated())
  {
    const {sendRequest} = useApi();
  useEffect(()=>{
    if(counter==0)
    {
      sendRequest('get','catalog','course',{},`GetByUserId`).then((x:any)=>{
        console.log(user);
        console.log(x);
        x.data.map((x:CourseDto)=>{
          setCourses(prev=>[...prev,x]);
        })
      });
      setCounter(counter+1);
    }
  },[]);
  }
  const cardData = courses?.map((x: CourseDto) => ({
    id:x.id,
    imageUrl: x.picture,
    name: x.name,
    categoryName: x.category?.name,
    ratings: Array(4).fill(0).map((_, index) => <i key={index} className=""><FaStar /></i>),
    description: x.description,
    price: x.price,
  })) || [];
  if(counter==0)
      {
        return(
          <RequireAuth>
          <Layout>
          <Loading></Loading>
          </Layout>
          </RequireAuth>
          
        )
      }
      return(
        <RequireAuth>
        <Layout>
          <Course cardData ={cardData} editable={true}></Course>
        </Layout>
        </RequireAuth>
        
      )
    
}