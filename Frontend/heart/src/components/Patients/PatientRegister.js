import React from "react";
import { useFormik } from "formik";
import { Card, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "D:/Research/Frontend/heart/src/Assests/CSS/Forms.css";


function PatientRegister() {
  const PatientRegister = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
      gender: "",
      dob: "",
      city: "",
    },
    validate: (values) => {
      const errors = {};
      if (PatientRegister.submitCount > 0) {
        if (!values.firstname) {
          errors.firstname = "First Name is required";
        }
        if (!values.lastname) {
          errors.lastname = "Lastname is required";
        }
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters";
        }
        if (!values.confirmpassword) {
          errors.confirmpassword = "Confirm Password is required";
        } else if (values.confirmpassword !== values.password) {
          errors.confirmpassword = "Passwords must match";
        }
        if (!values.phone) {
          errors.phone = "Phone number is required";
        } else if (!/^[0-9]+$/.test(values.phone)) {
          errors.phone = "Invalid phone number, please enter digits only";
        }
        if (!values.gender) {
          errors.gender = "Gender is required";
        }
        if (!values.dob) {
          errors.dob = "Date of Birth is required";
        }
        if (!values.city) {
          errors.city = "City is required";
        }
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, setTouched }) => {
      PatientRegister.setTouched({
        firstname: true,
        lastname: true,
        email: true,
        password: true,
        confirmpassword: true,
        phone: true,
        gender: true,
        dob: true,
        city: true,
      });
      if (PatientRegister.isValid) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/insert_patient/",
            {
              first_name: values.firstname,
              last_name: values.lastname,
              email: values.email,
              password: values.password,
              phone: values.phone,
              gender: values.gender,
              dob: values.dob,
              city: values.city,
            }
          );
          toast.success("User Added Successfully");

          // Handle the result from the API
          console.log(response.data);
        } catch (error) {
          toast.error("Username Already Exists");
          console.error("Error during API call:", error.message);
        }
      } else {
        console.log("Not all fields are filled in or contain valid data");
        toast.error("Not all fields are filled in or contain valid data");
      }

      // Set submitting to false to allow form resubmission
      setSubmitting(false);
    },
  });
  return (
    <>
    <ToastContainer />
    
      <Container className="d-flex justify-content-center my-2">
        <Card className="card_main p-3">
          <Card.Title
            style={{
              color: "#555",
              fontSize: "1rem",
              fontWeight: "600",
              marginTop: "10px",
            }}
          >
            <h1>Register</h1>
          </Card.Title>
          <hr style={{ padding: "0", margin: "0" }} />
          <div className="form-container">
            <Form>
              <Row className="my-3">
                <Col md="6">
                  <Form.Group className="formDesign">
                    <label className="lblDesign">First Name</label>
                    <Form.Control
                      size="md"
                      placeholder="First Name"
                      type="text"
                      name="firstname"
                      autoComplete="off"
                      onChange={PatientRegister.handleChange}
                      value={PatientRegister.values.firstname}
                    ></Form.Control>
                    {PatientRegister.errors.firstname && (
                      <div className="text-success">
                        {PatientRegister.errors.firstname}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="formDesign">
                    <label className="lblDesign">Last Name</label>
                    <Form.Control
                      size="md"
                      placeholder="Last Name"
                      type="text"
                      name="lastname"
                      autoComplete="off"
                      onChange={PatientRegister.handleChange}
                      value={PatientRegister.values.lastname}
                    ></Form.Control>
                    {PatientRegister.errors.lastname && (
                      <div className="text-success">
                        {PatientRegister.errors.lastname}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group className="formDesign">
                  <label className="lblDesign">E-mail</label>
                  <Form.Control
                    size="md"
                    placeholder="user@email.com"
                    type="email"
                    name="email"
                    autoComplete="off"
                    onChange={PatientRegister.handleChange}
                    value={PatientRegister.values.email}
                  ></Form.Control>
                  {PatientRegister.errors.email && (
                    <div className="text-success">
                      {PatientRegister.errors.email}
                    </div>
                  )}
                </Form.Group>
              </Row>
              <Row className="my-3">
                <Col md="6">
                  <Form.Group className="formDesign">
                    <label className="lblDesign">Password</label>
                    <Form.Control
                      size="md"
                      placeholder="Password"
                      type="password"
                      name="password"
                      autoComplete="off"
                      onChange={PatientRegister.handleChange}
                      value={PatientRegister.values.password}
                    ></Form.Control>
                    {PatientRegister.errors.password && (
                      <div className="text-success">
                        {PatientRegister.errors.password}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="formDesign">
                    <label className="lblDesign">Confirm Password</label>
                    <Form.Control
                      size="md"
                      placeholder="Password"
                      type="password"
                      name="confirmpassword"
                      autoComplete="off"
                      onChange={PatientRegister.handleChange}
                      value={PatientRegister.values.confirmpassword}
                    ></Form.Control>
                    {PatientRegister.errors.confirmpassword && (
                      <div className="text-success">
                        {PatientRegister.errors.confirmpassword}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Form.Group className="formDesign">
                    <label className="lblDesign">Phone Number</label>
                    <Form.Control
                      size="md"
                      placeholder="07XXXXXXXX"
                      type="text"
                      name="phone"
                      autoComplete="off"
                      onChange={PatientRegister.handleChange}
                      value={PatientRegister.values.phone}
                    ></Form.Control>
                    {PatientRegister.errors.phone && (
                      <div className="text-success">
                        {PatientRegister.errors.phone}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="formDesign">
                    <label className="lblDesign">Gender</label>
                    <Form.Select
                      size="md"
                      className="form-control"
                      name="gender"
                      value={PatientRegister.values.gender}
                      onChange={PatientRegister.handleChange}
                    >
                      <option value="">Choose</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Form.Select>
                    {PatientRegister.errors.gender && (
                      <div className="text-success">
                        {PatientRegister.errors.gender}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="my-3">
                <Col md="6">
                  <Form.Group className="formDesign">
                    <label className="lblDesign">Date of Birth</label>
                    <Form.Control
                      size="md"
                      type="date"
                      name="dob"
                      autoComplete="off"
                      onChange={PatientRegister.handleChange}
                      value={PatientRegister.values.dob}
                    ></Form.Control>
                    {PatientRegister.errors.dob && (
                      <div className="text-success">
                        {PatientRegister.errors.dob}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group className="formDesign">
                    <label className="lblDesign">City</label>
                    <Form.Control
                      size="md"
                      placeholder="City"
                      type="text"
                      name="city"
                      autoComplete="off"
                      onChange={PatientRegister.handleChange}
                      value={PatientRegister.values.city}
                    ></Form.Control>
                    {PatientRegister.errors.city && (
                      <div className="text-success">
                        {PatientRegister.errors.city}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <button
                  className="btnSubmit btn btn-success w-25"
                  type="button"
                  variant="primary"
                  onClick={() => {
                    PatientRegister.handleSubmit();
                  }}
                >
                  Register
                </button>
              </div>
            </Form>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default PatientRegister;
