import React, {useEffect, useState} from "react";
import axios from "axios";
import {
  BsFillBellFill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import { FaHeartbeat } from "react-icons/fa";
import "./Admin.css";

function AdminHome() {

  const [rowCount, setRowCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/count_prediction/");
        setRowCount(response.data.row_count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="main-container UserHome">
    <div className="main-title">
      <h3>Dashboard</h3>
    </div>

    <div className="main-cards">
      <div className="card">
        <div className="card-inner">
          <h3>Predictions</h3>
          <FaHeartbeat className="card_icon" />
        </div>
        <h1>{rowCount}</h1>
      </div>

      <div className="card">
        <div className="card-inner">
          <h3>CATEGORIES</h3>
          <BsFillGrid3X3GapFill className="card_icon" />
        </div>
        <h1>12</h1>
      </div>
      <div className="card">
        <div className="card-inner">
          <h3>CUSTOMERS</h3>
          <BsPeopleFill className="card_icon" />
        </div>
        <h1>33</h1>
      </div>

      <div className="card">
        <div className="card-inner">
          <h3>ALERTS</h3>
          <BsFillBellFill className="card_icon" />
        </div>
        <h1>42</h1>
      </div>
    </div>

    <div></div>
  </main>
  )
}

export default AdminHome;
