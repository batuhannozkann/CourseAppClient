import { useEffect, useState } from "react";
import useApi, {Api} from './../../utilties/OcelotApi'
import "./css/coursedetail.css";
import { useFormik } from 'formik';
import { useParams } from "react-router-dom";
import { AlertifyLibrary, NotificationPosition } from "../../utilties/Alertify";

const CourseDetail = () => {
    const {id} = useParams();
    const[course,setCourse] = useState<CourseDto>();
    const [categories,setCategories] = useState<Category[]>([]);
    const [counter,setCounter] = useState(0);
    const [refreshState,setRefreshState] = useState(0);
    const handleFileChange = (event:any) => {
        const file = event.target.files[0];
        courseDetailFormik.setFieldValue('file', file);
        
      };
    const {sendRequest} = useApi();
    useEffect(()=>{
        sendRequest('get','catalog','course',"",`GetById/?id=${id}`).then((x:any)=>{
            setCourse(x.data)
            console.log(x.data.data);
            courseDetailFormik.setFieldValue('name', x.data.name);
            courseDetailFormik.setFieldValue('price', x.data.price);
            courseDetailFormik.setFieldValue('description', x.data.description);
            courseDetailFormik.setFieldValue('duration', x.data.feature.duration);
            courseDetailFormik.setFieldValue('categoryId', x.data.category.id);
            courseDetailFormik.setFieldValue('id', x.data.id);
            courseDetailFormik.setFieldValue('pictureUrl', x.data.picture);
            courseDetailFormik.setFieldValue('userId', x.data.userId);
        });
        if(counter==0)
    {
      sendRequest('get','catalog','category').then((x:any)=>{
        x.data.map((x:Category)=>{
          setCategories(prev=>[...prev,x]);
        })
      });
      setCounter(counter+1);
    }
    },[refreshState])
  const courseDetailFormik = useFormik({
    initialValues: {
      pictureUrl:"",
      file:"",
      id:"",
      name: "",
      categoryId:"",
      description:"",
      userId:"",
      duration:0,
      price:0,
    },
    onSubmit: values => {
        console.log(values.file);
        const courseUpdateDto:CourseUpdateDto ={
            id: values.id,
            name: values.name,
            price: values.price,
            picture:values.pictureUrl,
            description: values.description,
            categoryid: values.categoryId,
            feature: {Duration:values.duration},
            userId:values.userId
        } 
        if(values.file=="")
        {
            sendRequest('put','catalog','course',courseUpdateDto).then((x)=>{setRefreshState(refreshState+1);AlertifyLibrary.AlertifySuccess('Course has been successfully updated',NotificationPosition.topCenter)});
        }
        else{
          sendRequest('file',"photostock","photo",{file:values.file}).then(((x:any)=>{
                courseUpdateDto.picture=x.data.data;
                Api.put('catalog','course',courseUpdateDto).then((x:any)=>{setRefreshState(refreshState+1);AlertifyLibrary.AlertifySuccess('Course has been successfully updated',NotificationPosition.topCenter)});
            }))
        }
        
    },
  });
  return (
    <div className="container-xl px-4 mt-4 edit-card">
      <nav className="nav nav-borders">
        <a className="nav-link active ms-0" href="#" target="__blank">Profile</a>
        <a className="nav-link" href="#" target="__blank">Billing</a>
        <a className="nav-link" href="#" target="__blank">Security</a>
        <a className="nav-link" href="#" target="__blank">Notifications</a>
      </nav>
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Course Picture</div>
            <div className="card-body text-center">
              <img className="img-account-profile mb-2" src={course?.picture} alt="" />
              <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
              <input type="file" onChange={handleFileChange} className="form-control" id="inputGroupFile01"/>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Course Details</div>
            <div className="card-body">
              <form onSubmit={courseDetailFormik.handleSubmit}>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputName">Name</label>
                    <input
                      className="form-control rounded"
                      id="inputName"
                      type="text"
                      placeholder="Enter course name"
                      name="name"
                      value={courseDetailFormik.values.name}
                      onChange={courseDetailFormik.handleChange}
                      onBlur={courseDetailFormik.handleBlur}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputCategory">Category</label>
                    <select
                      value={courseDetailFormik.values.categoryId}
                      id="inputCategory"
                      className="form-select"
                      name="categoryId"
                      onChange={courseDetailFormik.handleChange}
                      onBlur={courseDetailFormik.handleBlur}
                    >
                      <option disabled value="default">Select please</option>
                      {categories.map((x:Category,index:number)=>{
                        return(<option key={index} value={x.id}>{x.name}</option>)
                      })}
                    </select>
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-12">
                    <label className="small mb-1" htmlFor="inputDescription">Description</label>
                    <textarea
                      className="form-control"
                      id="inputDescription"
                      placeholder="Enter Description"
                      name="description"
                      value={courseDetailFormik.values.description}
                      onChange={courseDetailFormik.handleChange}
                      onBlur={courseDetailFormik.handleBlur}
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputDuration">Duration</label>
                    <input
                      className="form-control rounded"
                      id="inputDuration"
                      type="number"
                      placeholder="Enter Duration"
                      name="duration"
                      value={courseDetailFormik.values.duration}
                      onChange={courseDetailFormik.handleChange}
                      onBlur={courseDetailFormik.handleBlur}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPrice">Price</label>
                    <input
                      className="form-control rounded"
                      id="inputPrice"
                      type="number"
                      step="0.01"
                      name="price"
                      placeholder="Enter Price"
                      value={courseDetailFormik.values.price}
                      onChange={courseDetailFormik.handleChange}
                      onBlur={courseDetailFormik.handleBlur}
                    />
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
