import { useEffect, useState } from "react";
import useApi from './../../utilties/OcelotApi'
import "../course/css/coursedetail.css"
import { useFormik } from 'formik';
import { identityServerApi } from "../../utilties/identityServerApi";
import { AlertifyLibrary, NotificationPosition } from "../../utilties/Alertify";
import { TailSpinLoader } from "../../utilties/loading";
import { NavLink } from "react-router-dom";

const Account = ({updateUser}:any) => {
  const {sendRequest}  = useApi();
  const[loading,setLoading] = useState(0);
    const[user,setUser]:any = useState<any>();
    const handleFileChange = (event:any) => {
        const file = event.target.files[0];
        accountFormik.setFieldValue('file', file);
        
      };
    useEffect(()=>{
            
            identityServerApi.getUserInfoFromService().then((x:any)=>{
                console.log(x);
                setUser(x.data.data)
            accountFormik.setFieldValue('firstname', x.data.data.firstName);
            accountFormik.setFieldValue('lastname', x.data.data.lastName);
            accountFormik.setFieldValue('email', x.data.data.email);
            accountFormik.setFieldValue('city', x.data.data.city);
            accountFormik.setFieldValue('country', x.data.data.country?x.data.data.country:"");
            accountFormik.setFieldValue('xAddress', x.data.data.xAddress?x.data.data.xAddress:"");
            accountFormik.setFieldValue('linkedInAddress', x.data.data.linkedInAddress?x.data.data.linkedInAddress:"");
            accountFormik.setFieldValue('picture', x.data.data.picture);
            });
    },[])
  const accountFormik = useFormik({
    initialValues: {
      firstname:"",
      lastname:"",
      email:"",
      city:"",
      country:"",
      file:"",
      picture:"",
      xAddress:"",
      linkedInAddress:""
    },
    onSubmit: values => {
      setLoading(1);

        const userInfoDto:UpdateUserDto={
            firstName: values.firstname,
            lastName: values.lastname,
            email: values.email,
            city: values.city,
            country: values.country,
            xAddress: values.xAddress,
            linkedInAddress: values.linkedInAddress,
            picture: values.picture
        }
        if(values.file=="")
         {
            console.log(userInfoDto);
             identityServerApi.updateUserInfoFromService(userInfoDto).then(()=>{AlertifyLibrary.AlertifySuccess('Account information has been succesfully updated',NotificationPosition.topCenter)}).finally(()=>setLoading(0));
         }
         else{
             sendRequest("file","photostock","photo",{file:values.file}).then(((x:any)=>{
                userInfoDto.picture=x.data;
                 identityServerApi.updateUserInfoFromService(userInfoDto).then(()=>{AlertifyLibrary.AlertifySuccess('Account information has been succesfully updated',NotificationPosition.topCenter);user.picture=userInfoDto.picture;updateUser()}).finally(()=>{setLoading(0)});
             }))
         }
        
    },
  });
  if(loading==1)
  {
    return(<TailSpinLoader></TailSpinLoader>)
  }
  return (
    <div className="container-xl px-4 mt-4">
      <nav className="nav nav-borders">
        <a className="nav-link active ms-0" href="#" target="__blank">Profile</a>
        <NavLink className="nav-link" to="/User/Orders">Orders</NavLink>
        {/* <a className="nav-link" href="#" target="__blank">Security</a>
        <a className="nav-link" href="#" target="__blank">Notifications</a>  */}
      </nav>
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Picture</div>
            <div className="card-body text-center">
              <img className="img-account-profile rounded-circle mb-2" src={user?.picture} alt="" />
              <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
              <input type="file" onChange={handleFileChange} className="form-control" id="inputGroupFile01"/>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form onSubmit={accountFormik.handleSubmit}>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputFirstName">First Name</label>
                    <input
                      className="form-control rounded"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter first name"
                      name="firstname"
                      value={accountFormik.values.firstname}
                      onChange={accountFormik.handleChange}
                      onBlur={accountFormik.handleBlur}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLastName">Last Name</label>
                    <input
                       className="form-control rounded"
                       id="inputLastName"
                       type="text"
                       placeholder="Enter last name"
                       name="lastname"
                       value={accountFormik.values.lastname}
                       onChange={accountFormik.handleChange}
                       onBlur={accountFormik.handleBlur}
                    >
                    </input>
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputCountry">Country</label>
                    <input
                      className="form-control rounded"
                      id="inputCountry"
                      type="text"
                      placeholder="Enter Country"
                      name="country"
                      value={accountFormik.values.country}
                      onChange={accountFormik.handleChange}
                      onBlur={accountFormik.handleBlur}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputCity">City</label>
                    <input
                      className="form-control rounded"
                      id="inputCity"
                      type="text"
                      name="city"
                      placeholder="Enter City"
                      value={accountFormik.values.city}
                      onChange={accountFormik.handleChange}
                      onBlur={accountFormik.handleBlur}
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-12">
                    <label className="small mb-1" htmlFor="inputEmail">Email</label>
                    <input
                      className="form-control rounded"
                      id="inputEmail"
                      type="text"
                      placeholder="Enter Duration"
                      name="email"
                      readOnly
                      value={accountFormik.values.email}
                      onChange={accountFormik.handleChange}
                      onBlur={accountFormik.handleBlur}
                    />
                  </div>
                  </div>
                  <div className="row gx-3 mb-3">
                  <div className="col-md-12">
                    <label className="small mb-1" htmlFor="inputXAddress">X Address</label>
                    <input
                      className="form-control rounded"
                      id="inputXAddress"
                      type="text"
                      placeholder="https://twitter.com/home"
                      name="xAddress"
                      value={accountFormik.values.xAddress}
                      onChange={accountFormik.handleChange}
                      onBlur={accountFormik.handleBlur}
                    />
                  </div>
                  </div>
                  <div className="row gx-3 mb-3">
                  <div className="col-md-12">
                    <label className="small mb-1" htmlFor="inputLinkedInAddress">LinkedIn Address</label>
                    <input
                      className="form-control rounded"
                      id="inputLinkedInAddress"
                      type="text"
                      placeholder="https://www.linkedin.com/"
                      name="linkedInAddress"
                      value={accountFormik.values.linkedInAddress}
                      onChange={accountFormik.handleChange}
                      onBlur={accountFormik.handleBlur}
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

export default Account;
