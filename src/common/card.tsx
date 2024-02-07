import React from "react";
import "./card.css";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {sliceText} from '../utilties/commonfunctions'
import CardHover from "./cardhover";

export const Card = ({course}:any) =>{
    return(
       
            <div className="col-xl-3 col-lg-3 col-md-6 col-12">
            {/* Card */}
            <div className="card card-hover course-card mb-2">
              <NavLink to={`Course/View/${course.id}`}>
                <img style={{height:'25vh'}} src={course?.picture} className="card-img-top rounded-top-md" alt="" />
              </NavLink>
              {/* Card Body */}
              <div className="card-body">
                <NavLink to='#' className="badge bg-dark mb-2">{course?.category.name}</NavLink>
                <h5 className="card-title">
                  <NavLink to={`Course/View/${course.id}`} className="text-inherit">
                   {course?.name}
                  </NavLink>
                  <br/>
                  {Array(4).fill(0).map((_, index) => <i key={index} className=""><FaStar /></i>)}
                </h5>
                {/* Media Content */}
                <div className="row align-items-center g-0 mt-4">
                  <div className="col lh-1">
                    <h6 className="mb-1">Reva Yokk</h6>
                    <p className="fs-6 mb-0">September 05, 2020</p>
                  </div>
                  <div className="col-auto">
                    <p className="fs-6 mb-0 fw-bold">${course.price}</p>
                  </div>
                </div>
              </div>
              <div className="info-box d-flex flex-column align-items-start">
                <CardHover course={course}></CardHover>
                </div>

            </div>
          </div>
       )
    
}