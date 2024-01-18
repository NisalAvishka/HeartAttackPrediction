import React, { useState, useEffect } from "react";
import "./User.css";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function UserProfile(props) {
  const [fname, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDOB] = useState("");
  
  const linkTo = props.role === 'admin' ? '/admin/update' : props.role === 'user' ? '/user/update' : '/doctor/update';
  const Heading = props.role === 'admin' ? 'Admin Profile' : props.role === 'user' ? 'User Profile' : 'Doctor Profile';
  console.log(props.id);
  useEffect(() => {
    const fetchUserDetails = async () => {
      console.log(props.id);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/get_user/${props.id}/`
        );
        setFName(response.data.first_name);
        setLName(response.data.last_name);
        setGender(response.data.gender);
        setEmail(response.data.email);
        setCity(response.data.city);
        setDOB(response.data.dob);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [props.id]);


  return (
    <main className="main-container UserHome">
      <div className="main-title">
        <h3>{Heading}</h3>
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <div className="text-center">
                <Link
                  to={linkTo}
                  className="btn btn-primary btn-lg"
                  role="button"
                >
                  Update
                </Link>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    </main>
  );
}

export default UserProfile;
