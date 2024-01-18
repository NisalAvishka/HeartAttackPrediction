import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css";
import AdminTable from "./AdminTable";

function AdminRegister() {
    const [id, setId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://127.0.0.1:8000/api/user", {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            });
            setId(response.data.id);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, []);



  const Signup = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      city: "",
      gender: "",
    },
    validate: (values) => {
      const errors = {};
      if (Signup.submitCount > 0) {
        if (!values.firstname) {
          errors.firstname = "First Name is required";
        }
        if (!values.lastname) {
          errors.lastname = "Last Name is required";
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
        if (!values.gender) {
          errors.gender = "Gender is required";
        }
        if (!values.city) {
          errors.city = "City is required";
        }
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, setTouched }) => {
      Signup.setTouched({
        firstname: true,
        lastname: true,
        email: true,
        password: true,
        confirmpassword: true,
        gender: true,
        city: true,
      });
      if (
        values.firstname &&
        values.lastname &&
        values.email &&
        values.password &&
        values.confirmpassword &&
        values.gender &&
        values.city
      ) {
        console.log(JSON.stringify(values));
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/register",
            {
              email: values.email,
              first_name: values.firstname,
              last_name: values.lastname,
              password: values.password,
              role: "admin",
              city: values.city,
              gender: values.gender,
            }
          );
          toast.success("Admin Registered");
          setTimeout(() => {
            window.location.reload();
          }, 2000);

          // Handle the result from the API
          console.log(response.data);
        } catch (error) {
          toast.error("Admin Already Exists");
          console.error("Error during API call:", error.message);
        }
      } else {
        console.log("Not all fields are filled in or contain invalid data");
        toast.error("Not all fields are filled in or contain invalid data");
      }

      // Set submitting to false to allow form resubmission
      setSubmitting(false);
    },
  });

  return (
    <main className="main-container UserHome">
        <ToastContainer/>
      <div className="main-title text-center">
        <h3>Register Admin</h3>
      </div>
      <div className="container d-flex justify-content-center">
        <div className="form-container user_form">
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
                    onChange={Signup.handleChange}
                    value={Signup.values.firstname}
                  ></Form.Control>
                  {Signup.errors.firstname && (
                    <div className="text-success">
                      {Signup.errors.firstname}
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
                    onChange={Signup.handleChange}
                    value={Signup.values.lastname}
                  ></Form.Control>
                  {Signup.errors.lastname && (
                    <div className="text-success">{Signup.errors.lastname}</div>
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
                  onChange={Signup.handleChange}
                  value={Signup.values.email}
                ></Form.Control>
                {Signup.errors.email && (
                  <div className="text-success">{Signup.errors.email}</div>
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
                    onChange={Signup.handleChange}
                    value={Signup.values.password}
                  ></Form.Control>
                  {Signup.errors.password && (
                    <div className="text-success">{Signup.errors.password}</div>
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
                    onChange={Signup.handleChange}
                    value={Signup.values.confirmpassword}
                  ></Form.Control>
                  {Signup.errors.confirmpassword && (
                    <div className="text-success">
                      {Signup.errors.confirmpassword}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="6">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Gender</label>
                  <Form.Select
                    size="md"
                    className="form-control"
                    name="gender"
                    value={Signup.values.gender}
                    onChange={Signup.handleChange}
                  >
                    <option value="">Choose</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  {Signup.errors.gender && (
                    <div className="text-success">{Signup.errors.gender}</div>
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
                    onChange={Signup.handleChange}
                    value={Signup.values.city}
                  ></Form.Control>
                  {Signup.errors.city && (
                    <div className="text-success">{Signup.errors.city}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center mt-3">
              <button
                className="btnSubmit btn btn-success w-25"
                type="button"
                variant="primary"
                onClick={() => {
                  Signup.handleSubmit();
                }}
              >
                Register
              </button>
            </div>
          </Form>
        </div>
      </div>
      <div className="my-4">
      <AdminTable id={id}/>
      </div>
      
    </main>
  );
}

export default AdminRegister;
