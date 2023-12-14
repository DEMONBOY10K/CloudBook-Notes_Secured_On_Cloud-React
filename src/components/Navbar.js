import React from 'react'
import {Link, useLocation} from "react-router-dom";
const Navbar = () => {
    const location  = useLocation();
    
  return (
    <nav className="navbar navbar-dark navbar-expand-lg" style={{ backgroundImage: "linear-gradient(to right, #272898, #0a0f90)"}}>
    <div className="container-fluid">
        <Link className="navbar-brand text-white" to="./">CloudBoook</Link>
        <button className="navbar-toggler my-1" type="button" style={{ border: "2px solid white",marginBottom: "0px" }} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav flex-row justify-content-center me-auto mb-2 mb-lg-0">
                <li className="nav-item mx-1">
                    <Link className={`nav-link px-2 ${location.pathname==='/'?"active text-primary bg-light rounded ":"text-light"}`}  aria-current="page" to="./">Home</Link>
                </li>
                <li className="nav-item mx-1">
                    <Link className={`nav-link px-2 ${location.pathname==='/about'?"active text-primary bg-light rounded ":"text-light"}`} to="./about">About</Link>
                </li>
            </ul>
            <form className="d-flex">
            <Link className={`btn btn-outline-light mx-2 ${location.pathname==='/login' && "active" }`} to="/login" role="button">Login</Link>
            <Link className={`btn btn-outline-light mx-2 ${location.pathname==='/signup' && "active" }`} to="/signup" role="button">SignUp</Link>
            </form>
        </div>
    </div>
</nav>

  )
}

export default Navbar