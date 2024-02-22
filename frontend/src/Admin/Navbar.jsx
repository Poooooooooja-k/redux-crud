import React from 'react'
import './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../Reduxx/UserSlice';
const Navbar = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const loggingout = () => {
      dispatch(logout());
      navigate('/login')
    }
  return (
    <div>
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary"  style={{ backgroundColor: 'transparent' }}>
<div className="container-fluid mx-3">
  <Link className="navbar-brand" to='/'>home</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mx-3">
              <li className="nav-item">
               <button  onClick={loggingout} className="dropdown-item" href="#">logout</button>
              </li>
     </ul>
  </div>
</div>
</nav>
    </>
  </div>
  )
}

export default Navbar
