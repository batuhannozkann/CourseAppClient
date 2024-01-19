import react, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {Api} from '../../utilties/OcelotApi'
import { identityServerApi } from '../../utilties/identityServerApi'
import {Navbar} from '../navbar/navbar'
import Sidebar from '../sidebar/sidebar'
import { Account } from './account';
import { CreateCourseForm } from './createcourseform'
import Layout from '../layouts/layout'


export const CreateCourse = ()=>{
    const [userInfo,setUserInfo]:any = useState();
    
    return(
        <Layout>
          <CreateCourseForm></CreateCourseForm>
        </Layout>
    )
}