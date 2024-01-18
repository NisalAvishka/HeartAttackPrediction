import React, { useState, useEffect } from "react";
import "./User.css";
import {Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";


function ChangePassword(props) {
    const [cpassword, setCpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [redirect, setRedirect] = useState("");
    const linkTo = props.role === 'admin' ? '/admin/profile' : props.role === 'user' ? '/user/profile': props.role === 'doctor' ? '/doctor/profile' : '/login';

    const handleChange = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
      
        // Validate that all fields are filled
        if ( !cpassword || !newpassword || !confirmpassword) {
          toast.error("All fields must be filled");
        } else if (newpassword !== confirmpassword) {
          // Validate that new and confirm passwords match
          toast.error("New and confirm passwords must match");
        } else if (newpassword === cpassword) {
          // Validate that new and current passwords do not match
          toast.error("Select a new password different from the current one");
        } else {
          try {
            // Call the API only if there are no validation errors
            const response = await axios.post(
              `http://127.0.0.1:8000/api/change_password/`,
              {
                user_id: props.id,
                current_password: cpassword,
                new_password: newpassword,
              }
            );
      
            toast.success(response.data.message);
      
            setTimeout(() => {
                // Use Link to navigate to admin profile without refreshing the page
                setRedirect(true);
              }, 1500);
          } catch (error) {
            toast.error("Invalid Current Password");
            console.error("Error updating password:", error);
          }
        }
      };

      if (redirect) {
        return <Navigate to={linkTo} />;
      }
    
  return (
    <main className="main-container UserHome">
    <ToastContainer />
  <div className="main-title">
    <h3>Change Password</h3>
  </div>

  <div className="container d-flex justify-content-center">
  <div className="form-container user_form">
  <div className="rounded-frame">
              <img
                src="/password.png"
                alt="password"
                className="rounded-image"
              />
            </div>
    <Form>
        <Row className="mb-3">
            <Col md='6'>
            <Form.Group className="formDesign">
                  <label className="lblDesign">Current Password</label>
                  <Form.Control
                    size="md"
                    type="password"
                    autoComplete="off"
                    onChange={e => setCpassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row>
        <Col md='6'>
            <Form.Group className="formDesign">
                  <label className="lblDesign">New Password</label>
                  <Form.Control
                    size="md"
                    type="password"
                    autoComplete="off"
                    onChange={e => setNewpassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
            </Col>
            <Col md='6'>
            <Form.Group className="formDesign">
                  <label className="lblDesign">Confirm Password</label>
                  <Form.Control
                    size="md"
                    type="password"
                    autoComplete="off"
                    onChange={e => setConfirmpassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row>
              <div className="text-center mt-5">
              <button
                  className="btnSubmit btn btn-success"
                  type="submit"
                  variant="primary"
                  onClick={handleChange}
                  
                >
                  Change Password
                </button>
              </div>
            </Row>
    </Form>
    </div>
    </div>
    </main>
  )
}

export default ChangePassword;
