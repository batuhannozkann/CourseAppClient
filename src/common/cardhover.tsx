import useApi from "../utilties/OcelotApi";
import { TailSpinLoader } from "../utilties/loading";
import AddToCart from "./addtocart";
import { NavLink, useNavigate } from "react-router-dom";
import { sliceText } from "../utilties/functions";


const CardHover = ({course}:any)=>{
  const {sendRequest,isLoading} = useApi()
  const navigate = useNavigate();
  const handleCategoryClick = (categoryId:string)=>{
    const filterParameters:FilterParameters={
      categoryIds:[categoryId],
      minPrice:0,
      maxPrice:0
    }
    sendRequest('post','catalog','course',filterParameters,'GetFilteredCourses').then((x:any)=>{navigate('/Course/FilteredCourses', { state: { filteredData: x.data } })
    console.log(categoryId)});
  }
  if(isLoading==true)
  {
    return(<div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
    <TailSpinLoader />
  </div>)
  }
    return(
        <div className="card mb-4">
        {/* Card Body */}
        <div className="card-body">
          <div className="d-lg-flex">
            <div className="position-relative">
             
              
            </div>
            <div className="ms-lg-4">
              <div className="row"><img height={"60vh"} className="col-3" src={course?.picture}/><NavLink to={`Course/View/${course.id}`} className="mb-0 h5 text-primary col-9">{course?.name}</NavLink></div>
              <NavLink onClick={()=>{handleCategoryClick(course?.categoryId);console.log(course)}} to={'#'} className="badge bg-dark text-white fw-light fs-7">{course?.category.name}</NavLink>
              <p className="fs-6 mb-1 text-warning">
                
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
                 {sliceText(course?.description,150)}
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