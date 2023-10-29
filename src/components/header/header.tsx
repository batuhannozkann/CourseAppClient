import React from "react";
import "./header.css";

export const Header = () =>{
    return(
        <>
        <div className="row container-fluid headerSpace"> </div>
        <div className ="row container-fluid d-flex justify-content-center h5 headersBetwwenSpace">
            Blog
        </div>
        <div className="row container-fluid d-flex justify-content-center h1 text-center headersBetwwenSpace">
            Short heading goes here
        </div>
        <div className="row container-fluid d-flex justify-content-center px-3 text-center headersBetwwenSpace">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab esse excepturi facere impedit laboriosam sequi?
        </div>
        </>
        )
}