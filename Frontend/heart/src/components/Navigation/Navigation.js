import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Navigation() {
  const [name, setName] = useState("");


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

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  let menu;

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const closeNav = () => {
    if (!isNavCollapsed) {
      handleNavCollapse();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response.data);
        setName(response.data.first_name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (name === "") {
    menu = (
      <div>
        <div className="navbar-nav">
          <NavLink to="/" className="nav-item nav-link" onClick={closeNav}>
            Home
          </NavLink>
          <NavLink to="/login" className="nav-item nav-link" onClick={closeNav}>
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="nav-item nav-link"
            onClick={closeNav}
          >
            Register
          </NavLink>
          <NavLink
            to="/prediction"
            className="nav-item nav-link"
            onClick={closeNav}
          >
            Prediction
          </NavLink>
        </div>
      </div>
    );
  } else {
    menu = (
      <div>
        <div className="navbar-nav">
          <NavLink
            to="/"
            className="nav-item nav-link"
            onClick={() => {
              closeNav();
              logout();
            }}
          >
            Logout
          </NavLink>

          <NavLink to="/role" className="nav-item nav-link" onClick={closeNav}>
            Dashboard
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top p-3 ">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" onClick={closeNav}>
            Heart Health
          </NavLink>
          <button
            className={`navbar-toggler ${isNavCollapsed ? "collapsed" : ""}`}
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`navbar-collapse justify-content-end ${
              isNavCollapsed ? "collapse" : ""
            }`}
            id="navbarNavAltMarkup"
          >
            {menu}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
