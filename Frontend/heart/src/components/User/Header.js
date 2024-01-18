import React from 'react';
import { BsBoxArrowRight, BsJustify} 
from 'react-icons/bs';
import { IoHome } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import './User.css';
import { Link } from 'react-router-dom';

function Header(props) {

  const logout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={props.openSidebar}/>
      </div>
      <div className='header-left'>
      <FaCircleUser className='icon'/>
      {props.firstName  ? props.firstName : 'Guest'} {props.lastName  ? props.lastName : 'User'}
      </div>
      <div className='header-right'>
      <Link to='/' className='icon'>
        <IoHome />
      </Link>
        <BsBoxArrowRight className='icon' onClick={logout}/>
      </div>
    </header>
  )
}

export default Header;
