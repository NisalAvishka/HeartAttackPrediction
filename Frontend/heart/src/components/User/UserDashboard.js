import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Errorpage from "../Authentication/Errorpage";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./User.css";

function UserDashboard(props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    // Update state when props change
    setFirstName(props.name);
    setLastName(props.lName);
  }, [props.name, props.lName]);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };



  if (props.role === "user") {
    return (
        <div className="grid-container body">
          <Header openSidebar={openSidebar} firstName={firstName} lastName={lastName} />
          <Sidebar
            openSidebar={openSidebar}
            openSidebarToggle={openSidebarToggle}
          />
           <Outlet />
          
        </div>
    );
  } else {
    <Errorpage />;
  }
}

export default UserDashboard;
