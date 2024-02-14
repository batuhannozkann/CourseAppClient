
import Sidebar from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';



const Layout = ({ children }:any) => {
    return(
        <div>
           <Navbar/>
           <div className='row' style={{margin:'0',padding:'0'}}>
            <div className="col-md-2 px-0">
              <Sidebar/>
            </div>
            <div className="col-md-10 user-body bg-light p-0">
             {children}
            </div>
                </div>
           </div>
        
      )
};

export default Layout;