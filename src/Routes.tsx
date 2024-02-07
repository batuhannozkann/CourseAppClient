import {MainPage} from './components/mainpage/mainPage.tsx';
import { Login } from "./components/login/login.tsx";
import { SignUp } from './components/signup/signup.tsx';
import {Routes,Route, BrowserRouter} from "react-router-dom";
import {RequireAuth, useIsAuthenticated} from 'react-auth-kit';
import { ForgotPassword } from './components/forgotpassword/forgotPassword.tsx';
import { ResetPassword } from './components/forgotpassword/resetPassword.tsx';
import {User} from './components/userinfo/userinfo.tsx'
import { SaleCourses } from './components/userinfo/salecourses.tsx';
import { CreateCourse } from './components/userinfo/createcourse.tsx';
import { PurchasedCourses } from './components/userinfo/purchasedcourses.tsx';
import CourseDetail from './components/userinfo/coursedetail.tsx';
import { EditCourse } from './components/userinfo/editcourse.tsx';
import { CourseView } from './components/userinfo/courseview.tsx';
import { ShoppingCartMobile } from './components/basket/shoppingcartmobile.tsx';
import { Order } from './components/order/order.tsx';
import { OrderDetail } from './components/order/orderdetail.tsx';
import { FilteredCourses } from './components/filteredcourses/filteredcourses.tsx';



export const RouteList = ()=>{
  const isAuthenticated = useIsAuthenticated();
    return(
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="Login" element={<Login/>}/>
            <Route path="SignUp" element={<SignUp/>}/>
            <Route path="ForgotPassword" element={<ForgotPassword/>}/>
            <Route path="ResetPassword" element={<ResetPassword/>}></Route>
            <Route path='User' element={
        <RequireAuth loginPath={'/login'}>
          <User></User>
        </RequireAuth>
      }/>path="User/SaleCourses"
      <Route path="User/SaleCourses" element={
          <SaleCourses/>
      } />
      <Route path="User/PurchasedCourses" element={

          <PurchasedCourses/>

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
          <CourseView/>
      } />
      <Route path="User/Basket" element={
          <ShoppingCartMobile></ShoppingCartMobile>
      } />
      <Route path="User/Order" element={
          <Order></Order>
      } />
      <Route path="User/Order/:id" element={
          <OrderDetail></OrderDetail>
      } />
      <Route path="Course/FilteredCourses" element={<FilteredCourses/>}>
        </Route>
        </Routes>
        
    )
}