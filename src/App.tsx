import { RouteList } from './Routes.tsx';
import {AuthProvider} from 'react-auth-kit';
import my_refresh_api from './utilties/myRefreshApi.tsx'
import createStore from 'react-auth-kit';


function App() {


  return (
    <>
    <AuthProvider 
    authType = {'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "http:"}
    refresh={my_refresh_api}>
        <RouteList/>
    </AuthProvider>
    
    </>
  )
}

export default App