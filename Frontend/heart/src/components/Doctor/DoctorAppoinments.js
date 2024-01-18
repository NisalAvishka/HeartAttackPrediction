import React, { useState, useEffect } from "react";
import "./Doctor.css";
import { Row, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleRight } from "react-icons/fa6";

function DoctorAppointments(props) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/get_doctor_appointments/${props.id}/`
        );
        setTableData(response.data.appointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.id]);

  const handleSettingsClick = async (appointment) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/update_appointment/",
        { a_id: appointment.id }
      );
      toast.success("Completed");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      // You can also update the tableData state to refresh the table
      // setTableData(newData);
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment");
    }
  };

  return (
    <main className="main-container UserHome ">
      <ToastContainer />
      <div className="main-title text-center">
        <h3>Appoinments</h3>
      </div>
      <div className="container mt-5">
        <Row>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead style={{ backgroundColor: "#263043" }}>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Doctor Arrival Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Number</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.status}</td>
                    <td>{appointment.number}</td>
                    <td>
                      < FaAngleRight
                        className="icon"
                        onClick={() => handleSettingsClick(appointment)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Row>
      </div>
    </main>
  );
}

export default DoctorAppointments;
