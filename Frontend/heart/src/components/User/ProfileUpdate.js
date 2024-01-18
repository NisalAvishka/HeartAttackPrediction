import React, { useState, useEffect } from "react";
import "./User.css";
import {Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileUpdate(props) {
    const [fname, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDOB] = useState("");
  const linkTo = props.role === 'admin' ? '/admin/profile' : props.role === 'user' ? '/user/profile' : '/doctor/profile';

  const handleSave = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    if (!fname || !lName || !gender || !city || !dob) {
      toast.error("Please fill all the fields.");
    } else { 
  
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/update_user/`, {
        id: props.id,
        first_name: fname,
        last_name: lName,
        gender: gender,
        email: email,
        city: city,
        dob: dob,
      });
      toast.success(response.data.message);

      setTimeout(() => {
        window.location.href = linkTo;
      }, 1500);
    } catch (error) {
      toast.error("Invalid Details");
      console.error('Error updating user details:', error);
    }
  }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/get_user/${props.id}/`);
        setFName(response.data.first_name);
        setLName(response.data.last_name);
        setGender(response.data.gender);
        setEmail(response.data.email);
        setCity(response.data.city);
        setDOB(response.data.dob);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } 
    };
    fetchUserDetails();
  }, [props.id]); 

  return (
    <main className="main-container UserHome">
        <ToastContainer />
      <div className="main-title">
        <h3>Profile Update</h3>
      </div>

      <div className="container ">
        <div className="form-container user_form">
        {gender && (
            <div className="rounded-frame">
              <img
                src={gender === "male" ? "/man.jpg" : "/woman.jpg"}
                alt={gender}
                className="rounded-image"
              />
            </div>
          )}
          <Form>
            <Row className="mb-3">
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">First Name</label>
                  <Form.Control
                    size="md"
                    type="text"
                    autoComplete="off"
                    value={fname}
                    onChange={e => setFName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Last Name</label>
                  <Form.Control
                    size="md"
                    type="text"
                    autoComplete="off"
                    value={lName}
                    onChange={e => setLName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Gender</label>
                  <Form.Select
                    size="md"
                    className="form-control"
                    name="gender"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                  >
                    <option value="">Choose</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">E-mail</label>
                  <Form.Control
                    size="md"
                    type="text"
                    autoComplete="off"
                    value={email}
                    disabled
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">City</label>
                  <Form.Control
                    size="md"
                    type="text"
                    autoComplete="off"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Date of Birth</label>
                  <Form.Control
                      size="md"
                      type="date"
                      name="dob"
                      autoComplete="off"
                      value={dob}
                      onChange={e => setDOB(e.target.value)}
                    ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <div className="text-center">
              <button
                  className="btnSubmit btn btn-success btn-lg"
                  type="submit"
                  variant="primary"
                  onClick={handleSave}
                  
                >
                  Save
                </button>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default ProfileUpdate;
