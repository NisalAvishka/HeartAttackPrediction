import React, { useState } from "react";
import { useFormik } from "formik";
import { Card, Form, Container, Row} from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import Navigation from "../Navigation/Navigation";
import { Navigate } from "react-router-dom";

function Login() {
  const [redirect, setRedirect] = useState(false);

  const Login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (Login.submitCount > 0) {
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Password is required";
        }
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, setTouched }) => {
      Login.setTouched({
        email: true,
        password: true,
      });
      if (values.email && values.password) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/login",
            {
              email: values.email,
              password: values.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true, // Enable credentials (cookies)
            }
          );
          console.log(response.data);
          toast.success("Logged in Successfully");
          setRedirect(true);
        } catch (error) {
          toast.error("Invalid Username or Password");
          console.error("Error during API call:", error.message);
        }
        
      } else {
        console.log("Not all fields are filled in or contain invalid data");
        toast.error("Please Enter Both E-mail and Password");
      }
      setSubmitting(false);
    },
  });

  if (redirect) {
    window.location.href = "/role";
  }

  return (
    <div>
      <ToastContainer />
      <Navigation/>

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Card className="card_main p-3 custom-responsive-card">
          <Card.Title
            style={{
              color: "#555",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            <h1>Login</h1>
          </Card.Title>
          <hr style={{ padding: "0", margin: "0" }} />
          <div className="form-container">
            <Form>
              <Row className="my-3">
                <Form.Group className="formDesign">
                  <label className="lblDesign">E-mail</label>
                  <Form.Control
                    size="md"
                    placeholder="user@email.com"
                    type="email"
                    name="email"
                    autoComplete="off"
                    onChange={Login.handleChange}
                    value={Login.values.email}
                  ></Form.Control>
                  {Login.errors.email && (
                    <div className="text-success">{Login.errors.email}</div>
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="formDesign">
                  <label className="lblDesign">Password</label>
                  <Form.Control
                    size="md"
                    placeholder="Password"
                    type="password"
                    name="password"
                    autoComplete="off"
                    onChange={Login.handleChange}
                    value={Login.values.password}
                  ></Form.Control>
                  {Login.errors.password && (
                    <div className="text-success">{Login.errors.password}</div>
                  )}
                </Form.Group>
              </Row>

              <Row className="my-3">
                <div className="text-center">
                  <button
                    className="btnSubmit btn btn-success w-25"
                    type="button"
                    variant="primary"
                    onClick={() => {
                      Login.handleSubmit();
                    }}
                  >
                    Login
                  </button>
                </div>
              </Row>
            </Form>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
