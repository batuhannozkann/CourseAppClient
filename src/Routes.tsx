import {MainPage} from './components/mainpage/mainPage.tsx';
import { Login } from "./components/login/Login.tsx";
import { SignUp } from './components/signup/signup.tsx';
import {Routes,Route} from "react-router-dom";
import { RequireAuth } from 'react-auth-kit'

export const RouteList = ()=>{
    return(
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="Login" element={<Login/>}/>
            <Route path="SignUp" element={<SignUp/>}/>
            <Route path={'/secure'} element={
        <RequireAuth loginPath={'/login'}>
          <div>
            Secure
          </div>
        </RequireAuth>
      }/>
        </Routes>
    )
}