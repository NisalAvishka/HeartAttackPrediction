import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { BsFillHeartPulseFill, BsFillHeartFill, BsGrid1X2Fill, BsClockHistory, BsClipboard2CheckFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import {Link} from 'react-router-dom';
import { FaUnlockAlt } from "react-icons/fa";
import './User.css';

function Sidebar({openSidebarToggle, openSidebar}) {
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
          <Link to='/user/profile' className="sidebar-link">
            <MdAccountCircle className="icon"/> Profile
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to='/user/change_password' className="sidebar-link">
            <FaUnlockAlt className="icon"/> Change Password
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to='/user/pred' className="sidebar-link">
            <BsFillHeartPulseFill className="icon"/> Predict
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to='/user/history' className="sidebar-link">
            <BsClockHistory className="icon"/> History
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to='/user/appointment' className="sidebar-link">
            <FaUserDoctor className="icon"/> Doctor
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
