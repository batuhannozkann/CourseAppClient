import { useEffect } from "react";
import { Course } from "./course";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import useApi from '../../utilties/OcelotApi'
import Layout from "../layouts/layout";
import RequireAuth from "../layouts/RequireAuth";
import { useIsAuthenticated } from "react-auth-kit";
import { Loading } from "../../utilties/loading";

export const PurchasedCourses = ()=>{
  const isAuthenticated = useIsAuthenticated();
  const {sendRequest} = useApi();
  const [courses,setCourses] = useState<CourseDto[]>([]); 
  const [counter,setCounter] = useState(0);
  const [loading,setLoading] = useState(0);
  if(isAuthenticated())
  {
    useEffect(()=>{
      if(counter==0)
      {
        sendRequest('get','catalog','course',{},'GetByPurchasedCourseByLoginUser').then((x:any)=>{
          console.log(x);
          x?.data.map((x:any)=>{
            setCourses((prev)=>[...prev,x.course]);
          })
          setLoading(1);
        });
        setCounter(counter+1);
      }
    },[]);
  }
  const cardData:any = courses?.map((x: CourseDto) => ({
    id:x.id,
    imageUrl: x.picture,
    name: x.name,
    categoryName: x.category?.name, // Eğer Category undefined ise bu hatayı önler
    ratings: Array(4).fill(0).map((_, index) => <i key={index} className=""><FaStar /></i>),
    description: x.description,
    price: x.price,
  })) || [];
      if(loading==0)
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
        <Course cardData ={cardData}></Course>
        </Layout>
        </RequireAuth>
        
      )
    
}