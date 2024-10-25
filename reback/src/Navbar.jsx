import React from 'react'
import { Link } from 'react-router-dom'
import logo from './images/logo_uni.png';



import "./LogNavbar.css";

const Navbar = () => {
    // console.log(idd+"iddd");

  return (
    <>
        <nav className="col-12 navbar navbar-expand-lg mynav">
            <div className="container-fluid container navparent">
                <div className='col-3 nlogo '>
                {/* col-4 */}
                    <Link className="navbar-brand" to="/">
                        <div className="nlogo">
                            <img className='logo' src={logo} alt="uni" width={50} />
                            <div className='nav-me-text' to="/">Port Said<br/>University</div>
                        </div>
                    </Link>
                </div>
                <div className="col-9 row " id="navbarSupportedContent">
                {/* col-4 */}
                    <div className="col-3 linkparent">
                        <Link className="nav-link link" to='/dashbord'>Dashboard</Link>
                    </div>
                    <div className="col-3 linkparent">
                        <Link className="nav-link link" to="/library" aria-disabled="true">Library</Link>
                    </div>
                    <div className="col-3 linkparent">
                        <Link className="nav-link link" to="/universitycity">University City</Link>
                    </div>
                    <div className='col-3 linkparent'>
                            <Link className="nav-link link" to="/">Logout</Link>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar
