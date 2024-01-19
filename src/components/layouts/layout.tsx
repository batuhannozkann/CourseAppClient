// Layout component (Layout.js)
import React from 'react';
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
            <div className="col-md-10 user-body pt-3">
             {children}
            </div>
                </div>
           </div>
        
      )
};

export default Layout;