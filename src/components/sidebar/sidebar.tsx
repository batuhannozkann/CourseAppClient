import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./sidebar.css";
import { FaUserAlt } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BsCollectionPlayFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { useAuthUser } from 'react-auth-kit';

const MobileNavbar = () => {
  return (
    <nav className="navbar mobile-navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
          Sidebar
        </NavLink>
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Sidebar = () => {
  const authUser = useAuthUser();
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
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{minHeight:'calc(100vh - 97px)',height:'100%'}}>
        <div className="dropdown">
          <NavLink to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>{authUser()?.fullname}</strong>
          </NavLink>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li><NavLink className="dropdown-item" to="#">Sign out</NavLink></li>
          </ul>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
            <NavLink
                to="/User/"
                className={({ isActive, isPending }) => {
                console.log('/User isActive:', isActive);
                return isPending ? "" : isActive ? "nav-link text-white active " : "nav-link text-white";
                }}
                aria-current="page"
            >
                <FaUserAlt className="me-2" />
                <span>Account</span>
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink
                to="/User/PurchasedCourses"
                className={({ isActive, isPending }) => {
                console.log('/User/PurchasedCourses isActive:', isActive);
                return isPending ? "" : isActive ? "nav-link text-white active " : "nav-link text-white";
                }}
            >
                <BsCollectionPlayFill className="me-2" />
                <span>Purchased Courses</span>
            </NavLink>
            </li>
          <li className="nav-item">
            <NavLink to="/User/SaleCourses" className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? "nav-link text-white active " : "nav-link text-white"
        }>
              <BiSolidPurchaseTag className="me-2" />
              <span>Courses On Sale</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/User/CreateCourse"
            className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? "nav-link text-white active " : "nav-link text-white"
        }
            >
              <IoMdAddCircle className="me-2" />
              <span>Create Course</span>
            </NavLink>
          </li>
        </ul>
        <hr />
      </div>
    )
  );
};

export default Sidebar;
