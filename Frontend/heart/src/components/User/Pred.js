import React, { useState, useEffect } from "react";
import "./User.css";
import { useFormik } from "formik";
import { Form, Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Pred(props) {
  const [predictionResult, setPredictionResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({});

  const HeartAttackPredict = useFormik({
    initialValues: {
      age: "",
      sex: "",
      pain: "",
      pressure: "",
      chol: "",
      fbs: "",
      restecg: "",
      beats: "",
      exercise: "",
      oldpeak: "",
      slope: "",
      vessels: "",
      thall: "",
    },
    validate: (values) => {
      const errors = {};
      if (HeartAttackPredict.submitCount > 0) {
        if (!values.age) {
          errors.age = "Age is required";
        }
        if (!values.sex) {
          errors.sex = "Sex is required";
        }
        if (!values.pain) {
          errors.pain = "Chest Pain Type is required";
        }
        if (!values.pressure) {
          errors.pressure = "Resting Blood Pressure is required";
        }
        if (!values.chol) {
          errors.chol = "Total Cholesterol Level  is required";
        }
        if (!values.fbs) {
          errors.fbs = "Fasting blood sugar is required";
        }
        if (!values.restecg) {
          errors.restecg = "Resting ECG is required";
        }
        if (!values.beats) {
          errors.beats = "Heart Rate is required";
        }
        if (!values.exercise) {
          errors.exercise = "Exercise Induced Angina is required";
        }
        if (!values.oldpeak) {
          errors.oldpeak = "Old Peak Value is required";
        }
        if (!values.slope) {
          errors.slope = "ST Slope is required";
        }
        if (!values.vessels) {
          errors.vessels = "Major Vessels is required";
        }
        if (!values.thall) {
          errors.thall = "Thalassemia Status is required";
        }
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting, setTouched }) => {
      HeartAttackPredict.setTouched({
        age: true,
        sex: true,
        pain: true,
        pressure: true,
        chol: true,
        fbs: true,
        restecg: true,
        beats: true,
        exercise: true,
        oldpeak: true,
        slope: true,
        vessels: true,
        thall: true,
      });
      if (HeartAttackPredict.isValid) {
        try {
          setLoading(true);
          // Make a POST request to the Django API endpoint
          const response = await axios.post(
            "http://127.0.0.1:8000/api/predict/",
            values
          );

          // Handle the response from the API

          if (response.data && response.data.prediction !== undefined) {
            console.log("Prediction:", response.data.prediction);
            setInputValues(values);
            toast.success("Predecting...", {
              autoClose: 1500,
            });
            setPredictionResult(response.data.prediction);
            setTimeout(() => {
              setShowModal(true);
            }, 2000);
          } else {
            console.error("Invalid response from the API");
          }
        } catch (error) {
          console.error("Error making API request:", error.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Not all fields are filled in");
      }
    },
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      const formData = HeartAttackPredict.values;
      const response = await axios.post(
        `http://127.0.0.1:8000/api/insert_prediction/`,
        {
          ...formData,
        prediction: predictionResult,
        user_id: props.id,
        }
      );

      // Handle the response as needed
      console.log("Save Response:", response);
      toast.success("Save Successful...", {
        autoClose: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);

      // Close the modal after saving
      handleCloseModal();
    } catch (error) {
      console.error("Error saving data:", error.message);
      toast.error("Can't save data...")
    }
  };

  return (
    <main className="main-container UserHome">
      <ToastContainer />
      <div className="main-title">
        <h3>My Predictor</h3>
      </div>

      <div className="container  ">
        <div className="form-container prediction-form">
          <div className="text-center">
            <h4>Personal Health Info</h4>
          </div>
          <Form>
            <Row className="mb-3">
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Age</label>
                  <Form.Control
                    size="md"
                    placeholder="AGE"
                    type="text"
                    name="age"
                    autoComplete="off"
                    onChange={HeartAttackPredict.handleChange}
                    value={HeartAttackPredict.values.age}
                  ></Form.Control>
                  {HeartAttackPredict.errors.age && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.age}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Sex</label>
                  <Form.Select
                    size="md"
                    className="form-control"
                    name="sex"
                    value={HeartAttackPredict.values.sex}
                    onChange={HeartAttackPredict.handleChange}
                  >
                    <option value="">Choose</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                    <option value="0">Other</option>
                  </Form.Select>
                  {HeartAttackPredict.errors.sex && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.sex}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Exercise-induced Angina</label>
                  <Form.Select
                    size="md"
                    className="form-control"
                    name="exercise"
                    value={HeartAttackPredict.values.exercise}
                    onChange={HeartAttackPredict.handleChange}
                  >
                    <option value="">Choose</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Select>
                  {HeartAttackPredict.errors.exercise && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.exercise}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Blocked Major Vessels</label>
                  <Form.Select
                    style={{ width: "100%" }}
                    size="md"
                    className="form-control"
                    name="vessels"
                    value={HeartAttackPredict.values.vessels}
                    onChange={HeartAttackPredict.handleChange}
                  >
                    <option value="">Choose</option>
                    <option value="0">None</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                  {HeartAttackPredict.errors.vessels && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.vessels}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Chest Pain Type</label>
                  <Form.Select
                    style={{ width: "100%" }}
                    size="md"
                    className="form-control"
                    name="pain"
                    value={HeartAttackPredict.values.pain}
                    onChange={HeartAttackPredict.handleChange}
                  >
                    <option value="">Choose</option>
                    <option value="0">No Chest Pain</option>
                    <option value="1">Typical Angina</option>
                    <option value="2">Atypical Angina</option>
                    <option value="3">Non-Anginal Pain</option>
                  </Form.Select>
                  {HeartAttackPredict.errors.pain && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.pain}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center mb-3">
              <h4>Health Metrics</h4>
            </div>
            <Row className="mb-3">
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Resting Blood Pressure</label>
                  <Form.Control
                    size="md"
                    placeholder="(mm Hg)"
                    type="text"
                    name="pressure"
                    autoComplete="off"
                    onChange={HeartAttackPredict.handleChange}
                    value={HeartAttackPredict.values.pressure}
                  ></Form.Control>
                  {HeartAttackPredict.errors.pressure && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.pressure}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Total Cholesterol Level</label>
                  <Form.Control
                    size="md"
                    placeholder="(mg/dl)"
                    type="text"
                    name="chol"
                    autoComplete="off"
                    onChange={HeartAttackPredict.handleChange}
                    value={HeartAttackPredict.values.chol}
                  ></Form.Control>
                  {HeartAttackPredict.errors.chol && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.chol}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">FBS &gt; 120 mg/dl </label>
                  <Form.Select
                    style={{ width: "100%" }}
                    size="md"
                    className="form-control"
                    name="fbs"
                    autoComplete="off"
                    value={HeartAttackPredict.values.fbs}
                    onChange={HeartAttackPredict.handleChange}
                  >
                    <option value="">Choose</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Select>
                  {HeartAttackPredict.errors.fbs && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.fbs}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Maximum Heart Rate</label>
                  <Form.Control
                    size="md"
                    placeholder="(bpm)"
                    type="text"
                    name="beats"
                    autoComplete="off"
                    onChange={HeartAttackPredict.handleChange}
                    value={HeartAttackPredict.values.beats}
                  ></Form.Control>
                  {HeartAttackPredict.errors.beats && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.beats}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Thalassemia Status</label>
                  <Form.Select
                    style={{ width: "100%" }}
                    size="md"
                    className="form-control"
                    name="thall"
                    value={HeartAttackPredict.values.thall}
                    onChange={HeartAttackPredict.handleChange}
                  >
                    <option value="">Choose</option>
                    <option value="3">Normal</option>
                    <option value="1">Fixed Defect</option>
                    <option value="2">Reversible Defect</option>
                  </Form.Select>
                  {HeartAttackPredict.errors.thall && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.thall}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Resting ECG</label>
                  <Form.Select
                    style={{ width: "100%" }}
                    size="md"
                    className="form-control"
                    name="restecg"
                    value={HeartAttackPredict.values.restecg}
                    onChange={HeartAttackPredict.handleChange}
                  >
                    <option value="">Choose</option>
                    <option value="0">Normal</option>
                    <option value="1">ST-T Wave Abnormality</option>
                    <option value="2">Left Ventricular Hypertrophy</option>
                  </Form.Select>
                  {HeartAttackPredict.errors.restecg && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.restecg}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">Old Peak Value</label>
                  <Form.Control
                    size="md"
                    placeholder="(mm)"
                    type="text"
                    name="oldpeak"
                    autoComplete="off"
                    onChange={HeartAttackPredict.handleChange}
                    value={HeartAttackPredict.values.oldpeak}
                  ></Form.Control>
                  {HeartAttackPredict.errors.oldpeak && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.oldpeak}
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group className="formDesign">
                  <label className="lblDesign">ST Slope</label>
                  <Form.Select
                    size="md"
                    className="form-control"
                    name="slope"
                    value={HeartAttackPredict.values.slope}
                    onChange={HeartAttackPredict.handleChange}
                  >
                    <option value="">Choose</option>
                    <option value="0">Upwards</option>
                    <option value="1">Flat</option>
                    <option value="2">Downwards</option>
                  </Form.Select>
                  {HeartAttackPredict.errors.slope && (
                    <div className="text-success">
                      {HeartAttackPredict.errors.slope}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <button
                className="btnSubmit btn btn-success btn-lg"
                type="button"
                variant="primary"
                onClick={() => {
                  HeartAttackPredict.handleSubmit();
                }}
              >
                Predict
              </button>
            </div>
          </Form>
        </div>
      </div>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton className="modal-head">
          <Modal.Title className="title">Prediction Result</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p>Performing prediction...</p>
            </div>
          ) : predictionResult === 1 ? (
            <div>
              <h1 className="text-danger">Heart Attack Predicted</h1>
              <h5>Please Contact your doctor immediately....</h5>
              <p>The prediction is only based on a ML-generated analysis</p>
            </div>
          ) : (
            <div>
              <h1 className="text-success">No Heart Attack Predicted</h1>
              <p>The prediction is only based on a ML-generated analysis</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="modal-foot">
          {predictionResult === 1 ? (
            <>
              <Button
                variant="secondary"
                onClick={() => handleSave(inputValues)}
              >
                Save
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={handleSave}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default Pred;
