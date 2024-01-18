import React, { useState, useEffect } from "react";
import "./User.css";
import { Row, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppointmentTable(props) {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // Define a function to fetch data from the API
        const fetchAppointments = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get_user_appointment/${props.id}/`);
            const data = response.data;
            setTableData(data.appointments);
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
        fetchAppointments();
      }, [props.id]);

      const handleDeleteAppointment = async (appointmentId) => {
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/delete_user_appointment/${appointmentId}/`);
          const data = response.data;
          
          // Show a success toast
          toast.success(data.message);
    
          // Update the local state to reflect the changes
          setTableData((prevData) => prevData.filter(appointment => appointment.id !== appointmentId));
        } catch (error) {
          console.error('Error deleting appointment:', error.message);
          // Show an error toast
          toast.error('Error deleting appointment');
        }
      };

  return (
    <main className="main-container ">
        <ToastContainer/>
        <div className="main-title">
        <h3>Appointment Table</h3>
      </div>
    <div className="container mt-4">
      <Row>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead style={{ backgroundColor: "#263043" }}>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Doctor</th>
                <th scope="col">Doctor Arrival Time</th>
                <th scope="col">Status</th>
                <th scope="col">Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((user) => (
                <tr key={user.id}>
                  <td>{user.date}</td>
                  <td>{user.doctor_first_name} {user.doctor_last_name}</td>
                  <td>{user.time}</td>
                  <td>{user.status}</td>
                  <td>{user.number}</td>
                  <td>
                    <MdDelete
                      className="iconMain"
                      onClick={() => handleDeleteAppointment(user.id)}
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
  )
}

export default AppointmentTable;
