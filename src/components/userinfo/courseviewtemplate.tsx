import { useEffect, useState } from 'react';
import useApi from '../../utilties/OcelotApi';
import './css/courseview.css'
import { TiShoppingCart } from 'react-icons/ti';
import AddToCart from '../../common/addtocart';
import { Loading } from '../../utilties/loading';

const CourseViewTemplate = ({id}:any) => {
  const {sendRequest} = useApi();
  const[course,setCourse] = useState<CourseDto>();
  const [windowWidth,setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 768; 
  window.addEventListener('resize',(x:any)=>{
    setWindowWidth(x.currentTarget.innerWidth);
  });
  useEffect(()=>{
    sendRequest('get','catalog','course',"",`GetById/?id=${id}`).then((x:any)=>{
        setCourse(x.data)
        console.log("3123123");
    });
},[])
if (!course) {
  return(
    <Loading></Loading>
  )
}

return (
  <div className="container mt-3 course-view">
      <div className="row">
        {isMobile?<div className="col-md-7">
          <div className="d-flex justify-content-end">
          <img src={course?.picture} alt="project-image" className="rounded img-fluid" />
          </div>
          {isMobile?"":
           <div className={`project-info-box`}>
            <p><b>Category:</b> {course?.category.name}</p>
            <p><b>Skills:</b> </p>
          </div>}
        </div>:""}
        <div className="col-md-5">
          <div className="project-info-box mt-0">
            <h5>COURSE DETAIL</h5>
            <p className="mb-0">{course?.description}</p>
          </div>

          <div className="project-info-box">
            <p><b>Name:</b> {course?.name}</p>
            {isMobile?<><p><b>Category:</b> {course?.category.name}</p><p><b>Skills:</b> </p></>:""}
            <p><b>Date:</b> 14.02.2020</p>
            <p><b>Created:</b> James Doe</p>
            <p><b>Duration:</b>{course?.feature.duration}hours</p>
            <p className="mb-0"><b>Price:</b> ${course?.price}</p>
          </div>

          <div className="project-info-box mt-0 mb-0">
            <p className="mb-0">
              <span className="fw-bold mr-10 va-middle hide-mobile">{course?.userOwned?"Content":<AddToCart course={course} size={'lg'}></AddToCart>}</span>
            </p>
          </div>
        </div>
        {isMobile?"":<div className="col-md-7">
          <div className="d-flex justify-content-end">
          <img src={course?.picture} alt="project-image" className="rounded img-fluid" />
          </div>
           <div className={`project-info-box`}>
            <p><b>Category:</b> {course?.category.name}</p>
            <p><b>Skills:</b> </p>
          </div>
        </div>}
       

      </div>
    </div>
);
}

export default CourseViewTemplate;
