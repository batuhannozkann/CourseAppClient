import React from "react";
import "./card.css";
import { FaStar } from "react-icons/fa";

export const Card = () =>{
    return(
       
            <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            {/* Card */}
            <div className="card card-hover course-card mb-2">
              <a href="blog-single.html">
                <img style={{height:'25vh'}} src="https://firebasestorage.googleapis.com/v0/b/courseapplication-f3e34.appspot.com/o/data%2Frandom%2Fasp-1-550x422-1.jpg?alt=media&token=09bb93de-393d-4877-be29-950b147ed4b3" className="card-img-top rounded-top-md" alt="" />
              </a>
              {/* Card Body */}
              <div className="card-body">
                <a href="#" className="badge bg-primary mb-2">Courses</a>
                <h5 className="card-title">
                  <a href="blog-single.html" className="text-inherit">
                    How to become a modern Stack Developer in 2020
                  </a>
                  <br/>
                  {Array(4).fill(0).map((_, index) => <i key={index} className="fa fa-star"><FaStar /></i>)}
                </h5>
                {/* Media Content */}
                <div className="row align-items-center g-0 mt-4">
                  <div className="col lh-1">
                    <h6 className="mb-1">Reva Yokk</h6>
                    <p className="fs-6 mb-0">September 05, 2020</p>
                  </div>
                  <div className="col-auto">
                    <p className="fs-6 mb-0">20 Min Read</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
       )
    
}