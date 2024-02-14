import  { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { NavLink } from 'react-router-dom';
import { sliceText } from '../../utilties/commonfunctions';
import { Dropdown } from 'primereact/dropdown';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './css/course.css'
import { InputText } from 'primereact/inputtext';
import { Loading } from '../../utilties/loading';

export const Course = (props: any) => {
    const [layout, setLayout]:any = useState<'list' | 'grid' | (string & Record<string, unknown>)>('grid');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState< 1 | 0 | -1 | undefined | null>();
    const [sortField, setSortField] = useState<string | undefined>();
    const [courses,setCourses]:any = useState(props.courses);
    const windowWidth:number = window.innerWidth;
  const isMobile = windowWidth <= 990; 
  // window.addEventListener('resize',(x:any)=>{
  //   setWindowWidth(x.currentTarget.innerWidth);
  // });

    const sortOptions = [
        {label:'All',value:'all'},
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
        
    ];
    const onSortChange = (event:any) => {
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
  const handleSearchChange = (event:any)=>{
      const filteredCourses = props.cardData.filter((course:any)=>{
        return course.name.toLowerCase().includes(event.target.value.toLowerCase());
      })
      setCourses(filteredCourses);
  }
  useEffect(()=>{
    setCourses(props.cardData);
  },[props.cardData])
  
  const header = () => {
      return(
        <div className="d-flex">
                <DataViewLayoutOptions className="d-flex me-3 justify-content-start" layout={layout} onChange={(e) => setLayout(e.value)} />
                <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-full sm:w-14rem d-flex justify-content-end me-3" />
                <span className="p-input-icon-left d-flex">
                <i className="fa-solid fa-magnifying-glass"></i>
                <InputText className="col-12" onChange={handleSearchChange} placeholder="Search" />
                </span>

            </div>
      )
  };
    const listItem = (course: any,index:number) => {
        return (
          <div className="col-12" key={index}>
      <div className={classNames('card', { '': layout === 'list', '': layout === 'grid' })}>
        <div className="row g-0">
          <div className="col-12">
            <div className="card-body row">
            <div className={`${isMobile?"col-3":"col-2"}`}><img src={course.imageUrl} alt={course.name} className={`card-img ${isMobile?"h-100":""}`} /></div>
            <div className={`${isMobile?"col-9":"col-10"}`}>
              <NavLink to={`/Course/View/${course.id}`}><h5 className="card-title mb-0">{course.name}</h5></NavLink>
              <span className="text-black-50">{course.categoryName}</span>
              <p className="card-text mt-2">{sliceText(course.description, 200)}</p>
              <div className="d-flex justify-content-between align-items-end mt-3">
                <span className="fw-bold">${course.price}</span>
                <span className="text-primary">
                <span className="text-primary">{props.editable?<span className="mx-3"><NavLink className="text-danger" style={{textDecoration:"none"}} to={`/Course/Edit/${course.id}`}>Edit</NavLink>&nbsp;<i className="fa fa-angle-right text-danger"></i></span>:""}<NavLink style={{textDecoration:"none"}} to={`/Course/View/${course.id}`}>View</NavLink>&nbsp;<i className="fa fa-angle-right"></i></span>
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        );
    }
    const gridItem = (course: any,index:number) => {
      return (
          <div key={index} className="d-flex col-md-4 mt-4">
            <div className="card p-3 h-100">
              <div className="flex-row mb-3">
                <img src={course.imageUrl} width="100%" height="200vh" alt={`Logo for ${course.name}`} />
                <div className="d-flex flex-column ml-2">
                  <NavLink to={`/Course/View/${course.id}`}><span>{course.name}</span></NavLink>
                  <span className="text-black-50">{course.categoryName}</span>
                  <span className="ratings">{course.ratings}</span>
                </div>
              </div>
              <h6>{sliceText(course.description, 200)}</h6>
              <div className="d-flex justify-content-between install mt-3 align-items-end h-100">
                <span className="fw-bold">${course.price}</span>
                
                <span className="text-primary">{props.editable?<span className="mx-3"><NavLink className="text-danger" style={{textDecoration:"none"}} to={`/Course/Edit/${course.id}`}>Edit</NavLink>&nbsp;<i className="fa fa-angle-right text-danger"></i></span>:""}<NavLink style={{textDecoration:"none"}} to={`/Course/View/${course.id}`}>View</NavLink>&nbsp;<i className="fa fa-angle-right"></i></span>
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
    if(!courses)
    {
      return(
        <Loading></Loading>
      )
    }
    return (
        <div className="container">
                <DataView value={courses?courses:undefined} listTemplate={listTemplate} layout={layout} paginator rows={6} sortField={sortField} sortOrder={sortOrder} header={header()} />
        </div>
    );
}
