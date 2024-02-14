import "./css/createcourse.css"
import { useFormik } from "formik";
import useApi from '../../utilties/OcelotApi';
import {useEffect, useRef, useState} from 'react';
import { AlertifyLibrary, NotificationPosition } from "../../utilties/Alertify";
import { getDecryptedCookie } from "../../utilties/cookieHelper";

export const CreateCourseForm = ()=>{
  const {sendRequest} = useApi();
  const fileInputRef:any = useRef<HTMLInputElement | null>(null);
  const [categories,setCategories] = useState<Category[]>([]);
  const [counter,setCounter] = useState(0);
  const user= JSON.parse(getDecryptedCookie('user'));
  useEffect(()=>{
    if(counter==0)
    {
      sendRequest('get','catalog','category').then((x:any)=>{
        x.data.map((x:Category)=>{
          setCategories(prev=>[...prev,x]);
        })
      });
      setCounter(counter+1);
    }
  },[])

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    createCourseFormik.setFieldValue('file', file);
  };
  const createCourseFormik  = useFormik({
    initialValues: {
      name: "",        // Başlangıç değeri boş bir string
      categoryId: "default",  // Başlangıç değeri boş bir string
      description: "", // Başlangıç değeri boş bir string
      price: 0,        // Başlangıç değeri 0 ya da istediğiniz bir sayı
      duration: 0,
      file:{}     // Başlangıç değeri 0 ya da istediğiniz bir sayı
  },
    onSubmit: async ()=>{
      const courseCreateDto:CourseCreateDto = {
        Name: createCourseFormik.values.name,
        Price: createCourseFormik.values.price,
        Picture: "",
        Description: createCourseFormik.values.description,
        CategoryId: createCourseFormik.values.categoryId,
        Feature: {Duration:createCourseFormik.values.duration},
        userFullName:`${user.firstName} ${user.lastName}`
      }
      sendRequest('file','photostock','photo',{file:createCourseFormik.values.file}).then((x:any)=>{
        courseCreateDto.Picture=(x.data);
        sendRequest('post','catalog','course',courseCreateDto
          ).then(()=>{
          createCourseFormik.resetForm();
          if(fileInputRef.current)
          {
            fileInputRef.current.value='';
          }
          AlertifyLibrary.AlertifySuccess('Course have been succesfully added',NotificationPosition.topCenter)});
      });
      
    }
});
    return(
        <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div className="card create-course-card">
            <h5 className="text-center mb-4">Create course for sale</h5>
            <form  className="form-card" onSubmit={createCourseFormik.handleSubmit}>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">Name<span className="text-danger"> *</span></label>
                <input value={createCourseFormik.values.name} onChange={createCourseFormik.handleChange} type="text" id="name" name="name" placeholder="Enter course name" />
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">Category<span className="text-danger"> *</span></label>
                <select value={createCourseFormik.values.categoryId} onChange={createCourseFormik.handleChange} id="category" className="form-select" name="categoryId" >
                  {/* Add your category options here */}
                  <option disabled value="default">Select please</option>
                  {categories.map((x:Category,index:number)=>{
                    return(<option key={index} value={x.id}>{x.name}</option>)
                  })}
                  {/* Add more options if needed */}
                </select>
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-12 flex-column d-flex">
                <label className="form-control-label px-3">Description<span className="text-danger"> *</span></label>
                <textarea value={createCourseFormik.values.description} onChange={createCourseFormik.handleChange} id="description" name="description" placeholder="Enter your description" />
              </div>
            </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Price<span className="text-danger"> *</span></label>
                  <input value={createCourseFormik.values.price} onChange={createCourseFormik.handleChange} type="number" step="0.01" id="price" name="price" placeholder=""  />
                </div>
                <div className="form-group col-sm-6  flex-column d-flex">
                  <label className="form-control-label px-3">Duration<span className="text-danger"> *</span></label>
                  <input value={createCourseFormik.values.duration} onChange={createCourseFormik.handleChange} type="number" id="ans" name="duration" placeholder=""  />
                </div>
              </div>
              <div className="row justify-content-between text-left">
              <div className="form-group col-sm-12 flex-column d-flex">
                <label className="form-control-label px-3">Upload Picture<span className="text-danger"> *</span></label>
                <input onChange={handleFileChange} ref={fileInputRef} type="file" className="form-control" id="file" name="file" placeholder="Enter your description"  />
              </div>
            </div>
              <div className="row justify-content-end">
                <div className="form-group col-sm-12">
                  <button type="submit" className="btn-block btn-primary mt-2">Create</button>
                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
}