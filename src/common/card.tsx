import  { useEffect, useState } from "react";
import "./card.css";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {sliceText} from '../utilties/commonfunctions'
import CardHover from "./cardhover";
import { DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { DataView } from "primereact/dataview";
import AddToCart from "./addtocart";

export const Card = (props:any) =>{
  const [layout, setLayout] = useState<"grid" | "list">("grid"); 
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState< 1 | 0 | -1 | undefined | null>();
    const [sortField, setSortField] = useState<string | undefined>();
    const [courses,setCourses] = useState(props.courses);
    const isMobile = window.innerWidth<968;
  const sortOptions:any = [
    {label:'All',value:'all'},
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
    
];
const onSortChange:any = (event:any) => {
  const value = event.value;

  if (value.indexOf('!') === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
  } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
  }
};
const handleSearchChange:any = (event:any)=>{
  console.log(event.target.value);
  const filteredCourses = props.courses.filter((course:any)=>{
    return course.name.toLowerCase().includes(event.target.value.toLowerCase());
  })
  setCourses(filteredCourses);
}
useEffect(()=>{
setCourses(props.courses);
},[props.courses])

const header = () => {
  return(
    <div className={`d-flex ${isMobile?"flex-column":""}`}>
            <DataViewLayoutOptions className="d-flex me-3 justify-content-start" layout={layout} onChange={(e:any) => setLayout(e.value)}  />
            <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="mt-2 w-full sm:w-14rem d-flex justify-content-end me-3" />
            <span className="p-input-icon-left d-flex">
            <i className="fa-solid fa-magnifying-glass"></i>
            <InputText className="col-12 mt-2" onChange={handleSearchChange} placeholder="Search" />
            </span>

        </div>
  )
};
const gridItem = (course: any,index:number) => {
  return (
       
    <div key={index}  className="col-xl-3 col-lg-3 col-md-6 col-12">
    {/* Card */}
    <div className="card card-hover course-card mb-2">
      <NavLink to={`Course/View/${course.id}`}>
        <img style={{height:'25vh'}} src={course?.picture} className="card-img-top rounded-top-md" alt="" />
      </NavLink>
      {/* Card Body */}
      <div className="card-body" style={isMobile?{}:{minHeight:"20vh"}}>
        <NavLink to='#' className="badge bg-dark mb-2">{course?.category.name}</NavLink>
        <h5 className="card-title">
          <NavLink to={`Course/View/${course.id}`} className="text-inherit">
           {course?.name}
          </NavLink>
          <br/>
          {Array(4).fill(0).map((_, index) => <i key={index} className=""><FaStar /></i>)}
        </h5>
        {/* Media Content */}
        <div className="row align-items-center g-0">
          <div className="col lh-1">
            <h6 className="mb-1">Created: {course.userFullName}</h6>
            <p className="fs-6 mb-0">{new Date(course.createdDate).toLocaleDateString()}</p>
          </div>
          <div className="col-auto">
            <p className="fs-6 mb-0 fw-bold">${course.price}</p>
          </div>
          {isMobile?course.userOwned?<div className="d-flex justify-content-end"><a className="btn btn-sm btn-success">Owned</a></div>:<div className="d-flex justify-content-end"><AddToCart isMobile={isMobile} course={course}></AddToCart></div>:""}
        </div>
      </div>
      <div className="info-box d-flex flex-column align-items-start">
        <CardHover course={course}></CardHover>
        </div>

    </div>
  </div>
  );
};
const listItem = (course: any,index:number) => {
  return (
       
    <div key={index} className="row">
    {/* Card */}
    <div className="card card-hover course-card mb-2">
      {/* Card Body */}
      <div className="card-body row">
        <div className="row m-0">
      <NavLink className={`${isMobile?"col-4":"col-2"}`} to={`Course/View/${course.id}`}>
        <img style={{width:"100%"}} src={course?.picture} className=" rounded-top-md" alt="" />
      </NavLink>
      <div className={`${isMobile?"col-8":"col-10"}`}>
        <NavLink to='#' className="badge bg-dark mb-2">{course?.category.name}</NavLink>
        <h5 className="card-title">
          <NavLink to={`Course/View/${course.id}`} className="text-inherit">
           {course?.name}
          </NavLink>
          <br/>
          {Array(4).fill(0).map((_, index) => <i key={index} className=""><FaStar /></i>)}
        </h5>
        </div>
        {/* Media Content */}
        <div className="row align-items-center g-0 mt-4">
        <div className="col lh-1">
            <p><label className="fw-bold">Description</label>:  {isMobile?sliceText(course.description,50):sliceText(course.description,200)}</p>
            <h6 className="mb-1"><span className="fw-bold">Created</span>: {course.userFullName}</h6>
            <p className="fs-6 mb-0"><span className="fw-bold">Created Date</span>: {new Date(course.createdDate).toLocaleDateString()}</p>
          </div>
          <div className={`${isMobile?"col-3 d-flex justify-content-end flex-column  ":"col-2 text-center"}`}>
            <p className="d-flex justify-content-end fs-6 py-2 mb-0 fw-bold">${course.price}</p>
            {course.userOwned?<div className="d-flex justify-content-end"><a className="btn btn-sm btn-success">Owned</a></div>:<div className="d-flex justify-content-end"><AddToCart isMobile={isMobile} course={course}></AddToCart></div>}
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
  );
};
const itemTemplate = (course:any, layout:any, index:number) => {
  if (!course) {
      return;
  }

  if (layout === 'list') return listItem(course, index);
  else if (layout === 'grid') return gridItem(course,index);
};
const listTemplate:any = (courses:any, layout:any) => {
  
  return <div className="grid grid-nogutter row">{courses.map((course:any, index:number) => itemTemplate(course, layout, index))}</div>;
};
  return (
      <div className="container">
              <DataView value={courses} listTemplate={listTemplate} layout={layout} paginator rows={8} sortField={sortField} sortOrder={sortOrder} header={header()} />
      </div>
  );
    
}