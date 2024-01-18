import React, { useState, useEffect } from "react";
import "./User.css";
import { Row, Modal, Button, Form, Col } from "react-bootstrap";
import axios from "axios";
import { BsArrowRightSquareFill } from "react-icons/bs";

function History(props) {
  const [tableData, setTableData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState(null);
 
  useEffect(() => {
    // Call your dynamic API here using Axios
    const fetchData = async () => {
      console.log(props.dob);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/get_history/${props.id}/`
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.id, props.dob]);

  const handleMoreClick = (rowData) => {
    setModalData(rowData);
    setModalShow(true);
  };

  const sortedTableData = [...tableData].sort((a, b) => b.id - a.id);
  return (
    <main className="main-container ">
      <div className="main-title mb-4">
        <h3>Health History</h3>
      </div>
      <div className="container d-flex justify-content-center ">
        <Row>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead style={{ backgroundColor: "#263043" }}>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Blood Pressure (mmHg)</th>
                  <th scope="col">Total Cholesterol (mg/dl)</th>
                  <th scope="col">Fasting Blood Sugar &gt; 120 mg/dl</th>
                  <th scope="col">Heart Attack Prediction</th>
                  <th scope="col">More</th>
                </tr>
              </thead>
              <tbody>
                {sortedTableData.map((row, index) => (
                  <tr key={index}>
                    <td className="center-content">{row.date}</td>
                    <td>{row.pressure}</td>
                    <td>{row.chol}</td>
                    <td>{row.fbs === 0 ? "No" : "Yes"}</td>
                    <td>{row.prediction === 1 ? "Yes" : "No"}</td>
                    <td>
                      <BsArrowRightSquareFill
                        className="icon"
                        onClick={() => handleMoreClick(row)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Row>
      </div>
      {/* Modal */}
      <Modal
        show={modalShow}
        size="lg"
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-head">
          <Modal.Title className="title">More Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render additional details from modalData */}
          {modalData && (
            <div>
              <Form>
                <Row className="mb-3">
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">Date</label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={modalData.date}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">
                        Resting Blood Pressure
                      </label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={modalData.pressure}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">Total Cholesterol</label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={modalData.chol}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">
                        Fasting Blood Sugar &gt; 120
                      </label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={modalData.fbs === 0 ? "No" : "Yes"}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">Rest ECG</label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={
                          modalData.restecg === 0
                            ? "Normal"
                            : modalData.restecg === 1
                            ? "ST-T Abnormal"
                            : "Ventricular Hypertrophy"
                        }
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">Maximum Heart Rate</label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={modalData.beats}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">Old Peak</label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={modalData.oldpeak}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">Slope</label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={
                          modalData.slope === 0
                            ? "Upwards"
                            : modalData.slope === 1
                            ? "Flat"
                            : "Downwards"
                        }
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">Thalassemia Status</label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={
                          modalData.thall === 1
                            ? "Fixed Defect"
                            : modalData.thall === 2
                            ? "Reversible Defect"
                            : "Normal"
                        }
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">
                        Exercise-induced Angina
                      </label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={modalData.exercise === 0 ? "No" : "Yes"}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">Blocked Major Vessels</label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={modalData.vessels}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">Chest Pain Type</label>
                      <Form.Control
                        size="md"
                        type="text"
                        value={
                          modalData.pain === 0
                            ? "No Chest Pain"
                            : modalData.pain === 1
                            ? "Typical Angina"
                            : modalData.pain === 2
                            ? "Atypical Angina"
                            : "Non-Anginal Pain"
                        }
                        disabled
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                    <Col md="4"></Col>
                    <Col md="4">
                    <Form.Group className="formDesign">
                      <label className="lblDesign">
                        <h5>Heart Attack Prediction</h5>
                      </label>
                      <Form.Control
                      style={{ color: modalData.prediction === 1 ? 'red' : 'green', fontWeight: 'bold' }}
                        size="md"
                        type="text"
                        value={modalData.prediction === 0 ? "Not Predicted" : "Predicted"}
                        disabled
                      ></Form.Control>
                    </Form.Group>
                    </Col>
                    <Col md="4"></Col>

                </Row>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="modal-foot">
          <Button variant="primary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default History;
