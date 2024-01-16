import {MainPage} from './components/mainpage/mainPage.tsx';
import { Login } from "./components/login/login.tsx";
import { SignUp } from './components/signup/signup.tsx';
import {Routes,Route} from "react-router-dom";
import { RequireAuth } from 'react-auth-kit'
import { ForgotPassword } from './components/forgotpassword/forgotPassword.tsx';
import { ResetPassword } from './components/forgotpassword/resetPassword.tsx';
import {User} from './components/userinfo/userinfo.tsx'


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
        </Routes>
    )
}