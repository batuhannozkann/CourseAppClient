import { sliceText } from "../utilties/commonfunctions";
import AddToCart from "./addtocart";
import { NavLink } from "react-router-dom";


const CardHover = ({course}:any)=>{
    return(
        <div className="card mb-4">
        {/* Card Body */}
        <div className="card-body">
          <div className="d-lg-flex">
            <div className="position-relative">
             
              
            </div>
            <div className="ms-lg-4">
              <div className="row"><img className="col-3 rounded-circle" src={course?.picture}/><NavLink to={`Course/View/${course.id}`} className="mb-0 h4 text-primary col-9">{course?.name}</NavLink></div>
              <NavLink to={'#'} className="badge bg-dark text-white fw-light fs-7">{course?.category.name}</NavLink>
              <p className="fs-6 mb-1 text-warning">
                <span>4.5</span>
                <span className="mdi mdi-star text-warning me-2"></span>
                Course Rating
              </p>
              <p className="fs-6 text-muted">
                <span className="ms-2">
                  <span className="text-dark fw-medium">{course.feature.duration} </span>
                  Hours
                </span>
                <span className="ms-2">
                  <span className="text-dark fw-medium fw-light">1,10,124 </span>
                  Students
                </span>
              </p>
              <p>
                 {sliceText(course?.description,250)}
              </p>
              <div className="">
              <NavLink to={`Course/View/${course.id}`} className="btn btn-outline-secondary btn-sm">
                View details
              </NavLink>
              </div>
              <div className="mt-2">
                {course.userOwned?<a className="btn btn-sm btn-success">You Owned</a>:<AddToCart course={course}></AddToCart>}
              </div>
            </div>
          </div>
        </div>
      </div>
      
        
        )
}
export default CardHover;