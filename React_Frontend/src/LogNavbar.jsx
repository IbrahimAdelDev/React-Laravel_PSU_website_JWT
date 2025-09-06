import React from 'react'
import { Link } from 'react-router-dom'
import logo from './images/logo_uni.png';


import "./LogNavbar.css";

const LogNavbar = () => {
  return (
    <>
        <nav className="col-12 navbar navbar-expand-lg mynav">
            <div className="container-fluid container">
                <div className='nlogo col-3'>
                    <Link className="navbar-brand" to="/">
                        <div className="nlogo">
                            <img className='logo' src={logo} alt="uni" width={50} />
                            <div className='nav-me-text' to="/">Port Said<br/>University</div>
                        </div>
                    </Link>
                </div>
                <div className='col-5'>
                    <div className='row'>
                        <div className='col-8'></div>
                        <div className="col-2">
                            <Link className="nav-link link" to="/login">Login</Link>
                        </div>
                        <div className="col-2">
                            <Link className="nav-link link" to="/signup">Signup</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default LogNavbar
