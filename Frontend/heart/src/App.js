import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";
import HeartAttackPredictionForm from "./components/Predictor/HeartAttackPredictionForm";
import PatientRegister from "./components/Patients/PatientRegister";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import Home from "./components/Home/Home";
import Role from "./components/Authentication/Role";
import UserDashboard from "./components/User/UserDashboard";
import UserHome from "./components/User/UserHome";
import Pred from "./components/User/Pred";
import UserProfile from "./components/User/UserProfile";
import ProfileUpdate from "./components/User/ProfileUpdate";
import History from "./components/User/History";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminHome from "./components/Admin/AdminHome";
import AdminRegister from "./components/Admin/AdminRegister";
import DoctorRegister from "./components/Admin/DoctorRegister";
import UserTable from "./components/Admin/UserTable";
import DoctorDashbaord from "./components/Doctor/DoctorDashbaord";
import DoctorProfile from "./components/Doctor/DoctorProfile";
import DoctorUpdate from "./components/Doctor/DoctorUpdate";
import ChangePassword from "./components/User/ChangePassword";
import Appointment from "./components/User/Appointment";
import AppointmentTable from "./components/User/AppointmentTable";
import AdminAppointments from "./components/Admin/AdminAppointment";
import DoctorAppoinments from "./components/Doctor/DoctorAppoinments";


function App() {
  const [name, setName] = useState("");
  const [lName, setLName] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setName(response.data.first_name);
        setLName(response.data.last_name);
        setRole(response.data.role);
        setId(response.data.id);
        setDOB(response.data.dob);
        setGender(response.data.gender);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<div>Page Not Found</div>} />
          <Route path="/prediction" element={<HeartAttackPredictionForm />} />
          <Route path="/register" element={<PatientRegister />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role" element={<Role name={name} role={role} />} />
          <Route
            path="/user"
            element={<UserDashboard name={name} role={role} lName={lName} />}
          >
             <Route index element={<Navigate to="profile" />} />
             <Route path="pred" element={<Pred id={id} gender={gender} dob={dob}/>} />
             <Route path='profile' element={<UserProfile id={id} role={role}/>}/>
             <Route path='update' element={<ProfileUpdate id={id} role={role}/>}/>
             <Route path='history' element={<History id={id} dob={dob}/>}/>
             <Route path="change_password" element={<ChangePassword id={id} role={role}/>}/>
             <Route path="appointment" element={<Appointment id={id}/>}/>
             <Route path="appointmenttable" element={<AppointmentTable id={id}/>}/>
          </Route>
          <Route path='/admin' element={<AdminDashboard name={name} role={role} lName={lName}/>}>
          <Route index element={<Navigate to="profile" />} />
             <Route path='profile' element={<UserProfile id={id} role={role}/>}/>
             <Route path='update' element={<ProfileUpdate id={id} role={role}/>}/>
             <Route path="adminregister" element={<AdminRegister/>}/>
             <Route path="doctorregister" element={<DoctorRegister/>}/>
             <Route path="usertable" element={<UserTable/>}/>
             <Route path="change_password" element={<ChangePassword id={id} role={role}/>}/>
             <Route path="appointments" element={<AdminAppointments/>}/>
          </Route>
          <Route path='/doctor' element={<DoctorDashbaord name={name} role={role} lName={lName}/>}>
          <Route index element={<Navigate to="profile" />} />
            <Route path='profile' element={<DoctorProfile id={id} role={role}/>}/>
            <Route path="pred" element={<Pred id={id}/>}/>
            <Route path="update" element={<DoctorUpdate id={id} role={role}/>}/>
            <Route path="change_password" element={<ChangePassword id={id} role={role}/>}/>
            <Route path="appoinments" element={<DoctorAppoinments id={id}/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
