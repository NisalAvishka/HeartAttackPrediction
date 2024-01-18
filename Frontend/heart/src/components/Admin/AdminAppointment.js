import React, { useState, useEffect } from "react";
import "./Admin.css";
import { Row, Modal, Button, Form, Col } from "react-bootstrap";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminAppointments() {
  const [tableData, setTableData] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [number, setNumber] = useState("");

  const handleUpdateClick = (appointment) => {
    setSelectedAppointment(appointment);
    setNumber(appointment.number);
    setSelectedTime(appointment.time);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setShowModal(false);
  };

  const updateAppointment = async () => {
    try {
      // Convert time to 24-hour format before sending to the API
     

      // Make the API request to update the appointment
      const response = await axios.post(
        "http://127.0.0.1:8000/api/update_admin_appointments/",
        {
          a_id: selectedAppointment.id,
          a_time: selectedTime,
          a_number: number,
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);
  
        // Refetch data from the server after a successful update
        setTimeout(() => {
            window.location.reload();
          }, 2000);
      } else {
        toast.error(response.data.error || "Failed to update appointment.");
      }

      // Close the modal and reset state
      setShowModal(false);
      setSelectedAppointment(null);
      setNumber("");
      setSelectedTime("");
    } catch (error) {
      console.error("Error updating appointment:", error.message);
    }
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/get_admin_appointments/"
        );
        setTableData(response.data.appointments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    <main className="main-container UserHome ">
      <ToastContainer />
      <div className="main-title text-center">
        <h3>User Details</h3>
      </div>
      <div className="container mt-5">
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
                {tableData.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.date}</td>
                    <td>{appointment.doctor_first_name} {appointment.doctor_last_name}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.status}</td>
                    <td>{appointment.number}</td>
                    <td>
                      <RxUpdate
                        className="icon"
                        onClick={() => handleUpdateClick(appointment)}
                      />
                      <MdDelete
                      className="iconMain"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Row>
      </div>

      {/* Modal for displaying appointment details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className="modal-head">
          <Modal.Title className="title">Update Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <div>
              <Form>
                <Row className="my-3">
                  <Col md="6">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">Number</label>
                      <Form.Control
                        size="md"
                        placeholder="Number"
                        type="text"
                        name="number"
                        autoComplete="off"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">Time</label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="date"
                        autoComplete="off"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="modal-foot">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={updateAppointment}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </main>

  );
}

export default AdminAppointments;
