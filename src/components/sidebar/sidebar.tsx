import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./sidebar.css";
import { FaUserAlt } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BsCollectionPlayFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { identityServerApi } from '../../utilties/identityServerApi';
import {useAuthUser} from 'react-auth-kit';
import Cookies from 'js-cookie';
import {useIsAuthenticated} from 'react-auth-kit'
import { setEncryptedCookie, getDecryptedCookie } from '../../utilties/cookieHelper';
import Select from 'react-select'
import useApi from '../../utilties/OcelotApi';
import { useFormik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { TiShoppingCart } from 'react-icons/ti';



const MobileNavbar = () => {
  const navigate = useNavigate();
  const filterFormik = useFormik({
    initialValues:{
      minPrice:0,
      maxPrice:0
    },
    onSubmit:(values)=>{
      const filterParameters:FilterParameters={
        categoryIds:selectedOptions.map((x:any)=>{return x.value}),
        minPrice:values.minPrice,
        maxPrice:values.maxPrice
      }
      sendRequest('post','catalog','course',filterParameters,'GetFilteredCourses').then((x:any)=>{navigate('/Course/FilteredCourses', { state: { filteredData: x.data } });
    });
    }
  })
  const [selectedOptions, setSelectedOptions] = useState([]);
  // Seçeneklerin değiştiğinde çağrılacak işlev
  const handleSelectChange = (selectedOptions:any) => {
    setSelectedOptions(selectedOptions);
    console.log(selectedOptions);
  };
  const { sendRequest } = useApi();
  const [categories,setCategories] = useState<Category[]>();
  useEffect(()=>{
    sendRequest('get','catalog','category').then((x?:any)=>{console.log(x);setCategories(x?.data)});
  },[]);
  const categoryOptions:any = categories?.map((x: Category) => ({
   value:x.id,
   label:x.name
  })) || [];
  const [visible, setVisible] = useState(false);
  const [triggerCart,setTriggerCart] = useState(0);
  return (
    <nav className="navbar mobile-navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
        </NavLink>
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <a onClick={()=>{setVisible(true)}} className="nav-link">Filter</a>
          </li>
          <li className="nav-item">
          <NavLink onClick={()=>{setTriggerCart(triggerCart+1)}} to={"/User/Basket"} className="text-white text-decoration-none">
          <TiShoppingCart className="text-white" style={{height:"100%"}} />
          </NavLink>
          </li>
        </ul>
      </div>
      <Dialog header="Filter" visible={visible} style={{ width: '75vw' }} onHide={() => setVisible(false)}>
    <div className="mb-3 mt-3">
        <label htmlFor="category" className="form-label text-dark">
          Category:
        </label>
        <Select
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
          },
        })}
        isMulti
        name="categoryIds"
        options={categoryOptions}
        className="basic-multi-select text-dark border-1"
        classNamePrefix="select"
        value={selectedOptions} // Seçili değerlerin durumunu ata
        onChange={handleSelectChange} // Değişiklik olduğunda çalışacak işlevi belirt
  />
      </div>
      <div className="row">
      <div className="mb-3 col-6">
        <label htmlFor="minPrice" className="form-label text-dark">
          Min Price:
        </label>
        <input onChange={filterFormik.handleChange} type="number" name="minPrice" className="form-control" id="minPrice" />
      </div>
      <div className="mb-3 col-6">
        <label htmlFor="maxPrice" className="form-label text-dark">
          Max Price:
        </label>
        <input onChange={filterFormik.handleChange} type="number" name="maxPrice" className="form-control" id="maxPrice" />
      </div>
      </div>
      <a className="btn btn-primary" onClick={()=>{filterFormik.submitForm();}}>Filter</a>
      </Dialog>
    </nav>
    
  );
};
const AuthenticatedSidebar = (props: any) => {
  const navigate = useNavigate();
  const filterFormik = useFormik({
    initialValues:{
      minPrice:0,
      maxPrice:0
    },
    onSubmit:(values)=>{
      const filterParameters:FilterParameters={
        categoryIds:selectedOptions.map((x:any)=>{return x.value}),
        minPrice:values.minPrice,
        maxPrice:values.maxPrice
      }
      sendRequest('post','catalog','course',filterParameters,'GetFilteredCourses').then((x:any)=>{navigate('/Course/FilteredCourses', { state: { filteredData: x.data } });
    });
    }
  })
  const [selectedOptions, setSelectedOptions] = useState([]);
  // Seçeneklerin değiştiğinde çağrılacak işlev
  const handleSelectChange = (selectedOptions:any) => {
    setSelectedOptions(selectedOptions);
    console.log(selectedOptions);
  };
  const { sendRequest } = useApi();
  const [categories,setCategories] = useState<Category[]>();
  useEffect(()=>{
    sendRequest('get','catalog','category').then((x?:any)=>{console.log(x);setCategories(x?.data)});
  },[]);
  const categoryOptions:any = categories?.map((x: Category) => ({
   value:x.id,
   label:x.name
  })) || [];
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{minHeight:'calc(100vh - 97px)',height:'100%'}} >
      <div className="dropdown">
        <NavLink
          to="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={props.user?.picture}
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>{props.user?.firstName}</strong>
        </NavLink>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li>
            <NavLink className="dropdown-item" to="#">
              Sign out
            </NavLink>
          </li>
        </ul>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/User/"
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "nav-link text-white active " : "nav-link text-white"
            }
            aria-current="page"
          >
            <FaUserAlt className="me-2" />
            <span>Account</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/User/PurchasedCourses"
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "nav-link text-white active " : "nav-link text-white"
            }
          >
            <BsCollectionPlayFill className="me-2" />
            <span>Purchased Courses</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/User/SaleCourses"
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "nav-link text-white active " : "nav-link text-white"
            }
          >
            <BiSolidPurchaseTag className="me-2" />
            <span>Courses On Sale</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/User/CreateCourse"
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "nav-link text-white active " : "nav-link text-white"
            }
          >
            <IoMdAddCircle className="me-2" />
            <span>Create Course</span>
          </NavLink>
        </li>
      
      <hr className="bg-white p-1" />
      <h2>Filter:</h2>
      {/* Min ve Max Price Inputları */}
      {/* Kategori Seçimi */}
      <div className="mb-3">
        <label htmlFor="category" className="form-label text-white">
          Category:
        </label>
        <Select
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
          },
        })}
        isMulti
        name="categoryIds"
        options={categoryOptions}
        className="basic-multi-select text-dark border-1"
        classNamePrefix="select"
        value={selectedOptions} // Seçili değerlerin durumunu ata
        onChange={handleSelectChange} // Değişiklik olduğunda çalışacak işlevi belirt
  />
      </div>
      {/* Min ve Max Price Inputları */}
      <div className="row">
      <div className="mb-3 col-6">
        <label htmlFor="minPrice" className="form-label text-white">
          Min Price:
        </label>
        <input onChange={filterFormik.handleChange} type="number" name="minPrice" className="form-control" id="minPrice" />
      </div>
      <div className="mb-3 col-6">
        <label htmlFor="maxPrice" className="form-label text-white">
          Max Price:
        </label>
        <input onChange={filterFormik.handleChange} type="number" name="maxPrice" className="form-control" id="maxPrice" />
      </div>
      </div>
      <a className="btn btn-primary" onClick={()=>{filterFormik.submitForm();}}>Filter</a>
      </ul>
    </div>
    
  );
};
const NotAuthenticatedSidebar = () => {
  const navigate = useNavigate();
  const filterFormik = useFormik({
    initialValues:{
      minPrice:0,
      maxPrice:0
    },
    onSubmit:(values)=>{
      const filterParameters:FilterParameters={
        categoryIds:selectedOptions.map((x:any)=>{return x.value}),
        minPrice:values.minPrice,
        maxPrice:values.maxPrice
      }
      sendRequest('post','catalog','course',filterParameters,'GetFilteredCourses').then((x:any)=>{navigate('/Course/FilteredCourses', { state: { filteredData: x.data } });
    });
    }
  })
  const [selectedOptions, setSelectedOptions] = useState([]);
  // Seçeneklerin değiştiğinde çağrılacak işlev
  const handleSelectChange = (selectedOptions:any) => {
    setSelectedOptions(selectedOptions);
    console.log(selectedOptions);
  };
  const { sendRequest } = useApi();
  const [categories,setCategories] = useState<Category[]>();
  useEffect(()=>{
    sendRequest('get','catalog','category').then((x?:any)=>{console.log(x);setCategories(x?.data)});
  },[]);
  const categoryOptions:any = categories?.map((x: Category) => ({
   value:x.id,
   label:x.name
  })) || [];
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{minHeight:'calc(100vh - 97px)',height:'100%'}} >
      <div className="dropdown">
        <NavLink
          to="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
        </NavLink>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li>
            <NavLink className="dropdown-item" to="/Login">
              Login
            </NavLink>
            <NavLink className="dropdown-item" to="/SignUp">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {/* Kategori Seçimi */}
      <div className="mb-3">
        <label htmlFor="category" className="form-label text-white">
          Category:
        </label>
        <Select
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
          },
        })}
        isMulti
        name="colors"
        options={categoryOptions}
        className="basic-multi-select text-dark border-1"
        classNamePrefix="select"
        value={selectedOptions} // Seçili değerlerin durumunu ata
        onChange={handleSelectChange} // Değişiklik olduğunda çalışacak işlevi belirt
  />
      </div>
      {/* Min ve Max Price Inputları */}
      <div className="row">
      <div className="mb-3 col-6">
        <label htmlFor="minPrice" className="form-label text-white">
          Min Price:
        </label>
        <input type="number" className="form-control" id="minPrice" />
      </div>
      <div className="mb-3 col-6">
        <label htmlFor="maxPrice" className="form-label text-white">
          Max Price:
        </label>
        <input type="number" className="form-control" id="maxPrice" />
      </div>
      </div>
      <a className="btn btn-primary" onClick={()=>{filterFormik.submitForm();}}>Filter</a>
      </ul>
    </div>
  );
};

const Sidebar = ({updateUser}:any) => {
  const [user,setUser]:any = useState();
  const isAuthenticated = useIsAuthenticated();    
  useEffect(()=>{
      if(!Cookies.get("user")&&isAuthenticated()){
          identityServerApi.getUserInfoFromService(authUser().email).then((x:any)=>{setEncryptedCookie("user",JSON.stringify(x.data.data));setUser(x.data.data)});
      }
      else{
          setUser(JSON.parse(getDecryptedCookie("user")));
      }
  },[updateUser])
  const authUser:any = useAuthUser();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    isMobile ? (
      <MobileNavbar />
    ) : (
      isAuthenticated()?
      <AuthenticatedSidebar user={user}/>:<NotAuthenticatedSidebar/>
    )
  );
};

export default Sidebar;
