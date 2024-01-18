import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../User/Header";
import DoctorSidebar from "./DoctorSidebar";

function DoctorDashbaord(props) {
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
  if (props.role === "doctor") {
    return (
      <div className="grid-container body">
        <Header
          openSidebar={openSidebar}
          firstName={firstName}
          lastName={lastName}
        />
        <DoctorSidebar
          openSidebar={openSidebar}
          openSidebarToggle={openSidebarToggle}
        />
        <Outlet />
      </div>
    );
  }
}

export default DoctorDashbaord;
