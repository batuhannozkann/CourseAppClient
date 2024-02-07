
import  Account  from './account';
import Layout from '../layouts/layout'
import RequireAuth from '../layouts/RequireAuth';


export const User = ()=>{
    return(
      <RequireAuth>
        <Layout>
          <Account/>
        </Layout>
        </RequireAuth>
    )
} 