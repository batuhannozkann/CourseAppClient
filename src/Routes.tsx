import {MainPage} from './components/mainpage/mainPage.tsx';
import { Login } from "./components/login/login.tsx";
import { SignUp } from './components/signup/signup.tsx';
import {Routes,Route} from "react-router-dom";
import { RequireAuth } from 'react-auth-kit'
import { ForgotPassword } from './components/forgotpassword/forgotPassword.tsx';
import { ResetPassword } from './components/forgotpassword/resetPassword.tsx';
import {User} from './components/userinfo/userinfo.tsx'
import { SaleCourses } from './components/userinfo/salecourses.tsx';
import { CreateCourse } from './components/userinfo/createcourse.tsx';
import { PurchasedCourses } from './components/userinfo/purchasedcourses.tsx';
import CourseDetail from './components/userinfo/coursedetail.tsx';
import { EditCourse } from './components/userinfo/editcourse.tsx';
import { CourseView } from './components/userinfo/courseview.tsx';



export const RouteList = ()=>{
    return(
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="Login" element={<Login/>}/>
            <Route path="SignUp" element={<SignUp/>}/>
            <Route path="ForgotPassword" element={<ForgotPassword/>}/>
            <Route path="ResetPassword" element={<ResetPassword/>}></Route>
            <Route path={'User'} element={
        <RequireAuth loginPath={'/login'}>
          <User></User>
        </RequireAuth>
      }/>
      <Route path="User/SaleCourses" element={
        <RequireAuth loginPath="/login">
          <SaleCourses/>
        </RequireAuth>
      } />
      <Route path="User/PurchasedCourses" element={
        <RequireAuth loginPath="/login">
          <PurchasedCourses/>
        </RequireAuth>
      } />
      <Route path="User/CreateCourse" element={
        <RequireAuth loginPath="/login">
          <CreateCourse/>
        </RequireAuth>
      } />
      <Route path="Course/Edit/:id" element={
        <RequireAuth loginPath="/login">
          <EditCourse></EditCourse>
        </RequireAuth>
      } />
      <Route path="Course/View/:id" element={
        <RequireAuth loginPath="/login">
          <CourseView/>
        </RequireAuth>
      } />
        </Routes>
    )
}