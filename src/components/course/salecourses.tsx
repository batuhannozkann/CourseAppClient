import { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import { Course } from "./course";
import { FaStar } from "react-icons/fa";
import useApi from "../../utilties/OcelotApi";
import RequireAuth from "../layouts/RequireAuth";
import { getDecryptedCookie } from "../../utilties/cookieHelper";
import { useIsAuthenticated } from "react-auth-kit";
import { Loading } from "../../utilties/loading";


export const SaleCourses = ()=>{
  const [courses,setCourses] = useState<CourseDto[]>([]); 
  const [counter,setCounter] = useState(0);
  const user = getDecryptedCookie('user');
  const isAuthenticated = useIsAuthenticated();
  const [updateState,setUpdateState] = useState(0);
  const [loading,setLoading] = useState(0);
  const {sendRequest} = useApi();
  const handleUpdate = ()=>{
    sendRequest('get','catalog','course',{},`GetByUserId`).then((x:any)=>{
      console.log(user);
      console.log(x);
      setCourses([]);
      x.data.map((x:CourseDto)=>{
        setCourses(prev=>[...prev,x]);
      });
      setUpdateState(updateState+1);
      
    });
  }
  if(isAuthenticated())
  {
  useEffect(()=>{
    console.log("fonksiyon işe yaradı");
      sendRequest('get','catalog','course',{},`GetByUserId`).then((x:any)=>{
        console.log(user);
        console.log(x);
        setCourses([]);
        x.data.map((x:CourseDto)=>{
          setCourses(prev=>[...prev,x]);
        })
        setLoading(1);
      });
      setCounter(counter+1);
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
          <Course updateState={handleUpdate} cardData ={cardData} editable={true}></Course>
        </Layout>
        </RequireAuth>
        
      )
    
}