import react, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {Api} from '../../utilties/OcelotApi'
import { identityServerApi } from '../../utilties/identityServerApi'
import {Navbar} from '../navbar/navbar'
import Sidebar from '../sidebar/sidebar'
import  Account  from './account';
import { Course } from './course';
import Layout from '../layouts/layout'
import CourseDetail from './coursedetail'

export const User = ()=>{
    const [userInfo,setUserInfo]:any = useState();
    useEffect(()=>{
        identityServerApi.getUserInfo().then((x:any)=>setUserInfo(x.data));
    },[])

    return(
        <Layout>
          <Account/>
        </Layout>
    )
} 