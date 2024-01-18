import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { BsFillHeartFill, BsGrid1X2Fill, BsBookmarkCheckFill, BsFillHeartPulseFill} from "react-icons/bs";
import { FaUnlockAlt } from "react-icons/fa";
import {Link} from 'react-router-dom';
import './Doctor.css';

function DoctorSidebar({openSidebarToggle, openSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
        <BsFillHeartFill className="icon-header"/> Heart Health
        </div>
        <span className="icon close_icon" onClick={openSidebar}>X</span>
      </div>
      <ul className="sidebar-list">

        <li className="sidebar-list-item">
          <Link to='/doctor/profile' className="sidebar-link">
            <MdAccountCircle className="icon"/> Profile
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to='/doctor/change_password' className="sidebar-link">
            <FaUnlockAlt className="icon"/> Change Password
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to='/doctor/pred' className="sidebar-link">
            <BsFillHeartPulseFill className="icon"/> Prediction
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to='/doctor/appoinments' className="sidebar-link">
            <BsBookmarkCheckFill className="icon"/> Appointments
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default DoctorSidebar;