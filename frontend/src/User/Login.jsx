import React, { useState } from "react";
import Navbar from "./Navbar";
import { AxiosInstance } from "../components/AxiosInstance";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import '../User/Login.css';
import { login } from "../Reduxx/UserSlice";


const Login = () => {
    const val=useSelector((state)=>state.UserReducer)
    console.log(val)
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate()
    const dispatch=useDispatch();

    
 const handleSubmit= async (e)=>{
    e.preventDefault();
    await AxiosInstance.post('userlogin/',{
        email:username,
        password:password
    },{ headers: {
        'Content-Type': 'application/json'
    }}).then((response)=>{
      console.log(response.data.jwt)
      if(response&&response.data){
        console.log(response.data);
        dispatch(login(response.data));
        if(response.data.staff==="USER"){
            navigate('/');
        }
        else if(response.data.staff="ADMIN"){
          navigate('/adminhome');
        }
      }
      
      //  if(response&&response.data){
      //   console.log(response.dat)
      //   // dispatch(response.data)
      //  }
    }).catch((error)=>{
        console.log(error.response.data)
    })
    
 }
  return (
    <>
    <Navbar />
    <div className="login-page">
    
      <div className="container d-flex justify-content-center align-item-center  my-5 p-3">
        <form onSubmit={handleSubmit}>
            <div className="text-center my-5">
                <h1>Login</h1>
            </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
            value={username}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

            <button type="submit" className="btn btn-primary">Submit
            </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
