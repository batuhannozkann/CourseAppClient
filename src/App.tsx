import { useState } from 'react'
import { RouteList } from './Routes.tsx';
import  {AuthProvider}  from "react-auth-kit";


function App() {


  return (
    <>
    <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "http:"}
                  >
        <RouteList></RouteList>
    </AuthProvider>
    
    </>
  )
}

export default App
