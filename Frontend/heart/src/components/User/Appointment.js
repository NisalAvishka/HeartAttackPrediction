import React, { useState, useEffect } from "react";
import "./User.css";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

function Appointment(props) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [redirect, setRiderect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/get_doctors/"
        );
        setDoctors(response.data);
        console.log(response.data[1].first_name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleAppointment = async (e) => {
    e.preventDefault();
    console.log(selectedDate);
    console.log("Doctor", selectedDoctorId);
    console.log(props.id);
    if (!selectedDate || !selectedDoctorId) {
        toast.error('Please select both doctor and date.');
      } else{
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user_appointment/', {
              p_userId: props.id,
              p_doctorId: selectedDoctorId,
              p_date: selectedDate
            });
      
            toast.success(response.data.message);
          } catch (error) {
            console.error('Error making appointment:', error);
            toast.error('Appointment failed. Please try again.');
          }

      }
  }

  const handleNavigateToTable = () => {
    setRiderect(true);
  };

  if (redirect) {
    return <Navigate to="/user/appointmenttable" />;
  }

  return (
    <main className="main-container UserHome">
      <ToastContainer />
      <div className="main-title">
        <h3>Appointment</h3>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="form-container user_form">
          <Form>
            <Row className="my-3">
              <Col md="6">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Doctor</label>
                  <Form.Select
                    size="md"
                    className="form-control"
                    name="doctor"
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                  >
                    <option value="">Select doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctor_id} value={doctor.doctor_id}>
                        {`Dr ${doctor.first_name} ${doctor.last_name} - ${doctor.doctor_type}`}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Date</label>
                  <Form.Control
                    size="md"
                    type="date"
                    name="date"
                    autoComplete="off"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <button
                className="btnSubmit btn btn-success"
                type="submit"
                variant="primary"
                onClick={handleAppointment}
              >
                Appoint Doctor
              </button>
              </div>
              <div className="text-center mt-3">
              <button
                className="btnSubmit btn btn-success"
                type="submit"
                variant="primary"
                onClick={handleNavigateToTable}
              >
                View Appointments
              </button>
              </div>

          </Form>
        </div>
      </div>
    </main>
  );
}

export default Appointment;
