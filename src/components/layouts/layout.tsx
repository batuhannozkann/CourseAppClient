
import Sidebar from '../sidebar/sidebar';
import { Navbar } from '../navbar/navbar';
import { ReactComponentElement, useEffect, useState } from 'react';



const Layout = ( {children,updateUser}:any ) => {
 
  useEffect(()=>{},[updateUser])
    return(
        <div>
           <Navbar updateUser={updateUser}/>
           <div className='row' style={{margin:'0',padding:'0'}}>
            <div className="col-md-2 px-0">
              <Sidebar updateUser={updateUser}/>
            </div>
            <div className="col-md-10 user-body bg-light p-0">
             {children}
            </div>
                </div>
           </div>
        
      )
};

export default Layout;