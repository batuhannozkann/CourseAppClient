import React from "react";
import "./card.css";

export const Card = () =>{
    return(
         <div className="card-item mx-4 col-lg-3 col-sm-12 my-lg-0 my-3">
         <div className="card-image row mx-0"><img className="px-0 card-image-content" src="src/assets/card-image.png"></img></div>
         <div className="cardBottomSection row my-2 mx-0 ">Category</div>
         <div className="card-header row mx-0 my-0 h5">Blog title heading will go here</div>
         <div className="row mx-0 my-2">
            <div className="p-0 me-2 col-2">
                <img className="profile img-fluid" src="src/assets/gentlemen-1.jpg"></img>
            </div>
            <div className="col-9">
                <div className="h6 py-0 my-0 row">
                    Full Name
                </div>
                <div className="row">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, dolore.
                </div>
            </div>
         </div>
        </div>
       )
    
}