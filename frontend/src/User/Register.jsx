import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../components/AxiosInstance";
import '../User/Register.css';

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit=async (e)=>{
    setError("")
    e.preventDefault(e)
    if (password === confirmPassword) {
        await AxiosInstance.post('register/', {
            first_name: firstname,
            last_name: lastname,
            email,
            phone,
            password,
        },{
            headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => {
            alert("registration successfull")
            navigate('/');
        })
        .catch(error => {
            console.error('Error occurred during request:', error.response.data);
            setError('An error occurred during registration.');
        });
    } else {
        setError("Passwords do not match");
    }
}

  return (
    <>
    <Navbar />
    <div className="register-page">
      <div className="container d-flex justify-content-center align-item-center  my-5 p-3">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <h1>Register</h1>
          <div className="mb-3">
            <input
              type="text"
              value={firstname}
              className="form-control"
              placeholder="Enter your first name"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={lastname}
              className="form-control"
              placeholder="Enter your last name"
              onChange={(e) => setLastname(e.target.value)}
              required
            />{" "}
          </div>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              className="form-control"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />{" "}
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={phone}
              className="form-control"
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
              required
            />{" "}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              className="form-control"
              placeholder="enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />{" "}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={confirmPassword}
              className="form-control"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="p-3">
            {error && <div className="error">{error}</div>}
            <span>Already have an account?</span> <Link to="/login">Login</Link>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
         
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
