
import  Account  from './account';
import Layout from '../layouts/layout'
import RequireAuth from '../layouts/RequireAuth';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


export const User = ()=>{
  const [updateUser,setUpdateUser] = useState(0)
  const handleUpdate = ()=>{
    Cookies.remove('user')
    setUpdateUser(updateUser+1);
  }
  useEffect(()=>{
    console.log("yenilendi");
  },[updateUser])
    return(
      <RequireAuth>
        <Layout updateUser={updateUser}>
          <Account updateUser={handleUpdate}/>
        </Layout>
        </RequireAuth>
    )
} 