import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { BsFillHeartFill, BsGrid1X2Fill, BsBookmarkCheckFill} from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import {Link} from 'react-router-dom';
import './Admin.css';

function AdminSidebar({openSidebarToggle, openSidebar}) {
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
          <Link to='/admin/profile' className="sidebar-link">
            <MdAccountCircle className="icon"/> Profile
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to='/admin/change_password' className="sidebar-link">
            <FaUnlockAlt className="icon"/> Change Password
          </Link>
        </li>


        <li className="sidebar-list-item">
          <Link to='/admin/adminregister' className="sidebar-link">
            <RiAdminFill className="icon"/> Register Admin
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to='/admin/doctorregister' className="sidebar-link">
            <FaUserDoctor className="icon"/> Register Doctor
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to='/admin/usertable' className="sidebar-link">
            <FaUserCheck className="icon"/> Users
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to='/admin/appointments' className="sidebar-link">
            <BsBookmarkCheckFill className="icon"/> Appointments
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default AdminSidebar
