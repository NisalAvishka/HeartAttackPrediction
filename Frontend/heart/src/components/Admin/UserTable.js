import React, { useState, useEffect } from "react";
import "./Admin.css";
import { Row, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserTable() {
  const [tableData, setTableData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/get_users/"
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sortedTableData = [...tableData].sort((a, b) => b.id - a.id);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Make the delete API request here using selectedUser.id
      await axios.delete(
        `http://127.0.0.1:8000/api/delete_user/${selectedUser.id}/`
      );
      toast.success("User deleted successfully");
      console.log("User deleted successfully");

      // After successful deletion, close the modal and update the tableData state
      setShowModal(false);
      setTableData((prevData) =>
        prevData.filter((user) => user.id !== selectedUser.id)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Can't Delete User");
      // Handle error as needed
    }
  };

  return (
    <main className="main-container UserHome ">
        <ToastContainer/>
        <div className="main-title text-center">
        <h3>User Details</h3>
      </div>
      <div className="container mt-5">
        <Row>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead style={{ backgroundColor: "#263043" }}>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">City</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedTableData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.city}</td>
                    <td>{user.dob}</td>
                    <td>{user.gender}</td>
                    <td>
                      <MdDelete
                        className="iconMain"
                        onClick={() => {
                          handleDeleteClick(user);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Row>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="modal-head">
          <Modal.Title className="title">Delete Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the Admin:</p>
          <p>
            <strong>
              {selectedUser &&
                `${selectedUser.first_name} ${selectedUser.last_name}`}
            </strong>
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-foot">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default UserTable;
