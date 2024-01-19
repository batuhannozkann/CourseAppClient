import React, { useEffect, useState } from 'react';
import { Api } from '../../utilties/OcelotApi';
import { NavLink } from 'react-router-dom';
import './css/courseview.css'

const CourseViewTemplate = ({id}:any) => {
  const[course,setCourse] = useState<CourseDto>();
  useEffect(()=>{
    Api.get('catalog','course',"",`GetById/?id=${id}`).then((x:any)=>{
        setCourse(x.data.data)
        console.log(x.data.data);
    });
},[])

return(
  <div className="container course-view">
      <div className="row">
        <div className="col-md-5">
          <div className="project-info-box mt-0">
            <h5>COURSE DETAIL</h5>
            <p className="mb-0">{course?.description}</p>
          </div>

          <div className="project-info-box">
            <p><b>Name:</b> {course?.name}</p>
            <p><b>Date:</b> 14.02.2020</p>
            <p><b>Created:</b> James Doe</p>
            <p><b>Duration:</b>{course?.feature.duration}hours</p>
            <p className="mb-0"><b>Price:</b> ${course?.price}</p>
          </div>

          <div className="project-info-box mt-0 mb-0">
            <p className="mb-0">
              <span className="fw-bold mr-10 va-middle hide-mobile">Share:</span>
              <a href="#x" className="btn btn-xs btn-facebook btn-circle btn-icon mr-5 mb-0"><i className="fab fa-facebook-f"></i></a>
              <a href="#x" className="btn btn-xs btn-twitter btn-circle btn-icon mr-5 mb-0"><i className="fab fa-twitter"></i></a>
              <a href="#x" className="btn btn-xs btn-pinterest btn-circle btn-icon mr-5 mb-0"><i className="fab fa-pinterest"></i></a>
              <a href="#x" className="btn btn-xs btn-linkedin btn-circle btn-icon mr-5 mb-0"><i className="fab fa-linkedin-in"></i></a>
            </p>
          </div>
        </div>

        <div className="col-md-7">
          <img src={course?.picture} alt="project-image" className="rounded" />
          <div className="project-info-box">
            <p><b>Category:</b> {course?.category.name}</p>
            <p><b>Skills:</b> </p>
          </div>
        </div>
      </div>
    </div>
)
}

export default CourseViewTemplate;
