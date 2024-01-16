import { RouteList } from './Routes.tsx';
import  {AuthProvider}  from "react-auth-kit";
import refresh from './utilties/myRefreshApi.tsx'


function App() {


  return (
    <>
    <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "http:"}
                  refresh={refresh}
                  >
        <RouteList></RouteList>
    </AuthProvider>
    
    </>
  )
}

export default App