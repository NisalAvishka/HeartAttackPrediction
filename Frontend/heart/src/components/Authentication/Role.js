import React from "react";
import { Navigate } from 'react-router-dom';


function Role(props) {
  
  if (props.role === "user") {
    return <Navigate to="/user" />;
  }else if(props.role === "admin"){
    return <Navigate to="/admin"/>;
  }else if(props.role === "doctor"){
    return <Navigate to="/doctor"/>;
  }else{

  return (
    <>
    </>
  );
  }
}

export default Role;
