import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Link, useLocation} from "react-router-dom";
const Navbar = (props) => {
    let navigate = useNavigate();
    const location  = useLocation();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate("/login");
        props.showAlert("Logout Successfull","success");
    }
  return (
    <nav className="navbar navbar-dark navbar-expand-lg" style={{ backgroundImage: "linear-gradient(to right, #272898, #0a0f90)"}}>
    <div className="container-fluid">
        <Link className="navbar-brand text-white" to="./">CloudBoook</Link>
        <button className="navbar-toggler my-1" type="button" style={{ border: "2px solid white",marginBottom: "0px" }} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav flex-row justify-content-center me-auto mb-2 mb-lg-0">
                {localStorage.getItem('token')&&<li className="nav-item mx-1">
                    <Link className={` btn btn-outline-light ${location.pathname==='/' && "active" }`} style={{padding :"0.25rem 0.4rem",borderRadius:"0.5rem"}} aria-current="page" to="./">Notes</Link>
                </li>}
                <li className="nav-item mx-1">
                    <Link className={` btn btn-outline-light  ${location.pathname==='/about'&& "active" }`} style={{padding :"0.25rem 0.4rem",borderRadius:"0.5rem"}} to="./about">About</Link>
                </li>
            </ul>
            {!localStorage.getItem('token')?
            <div className="d-flex">
            <Link className={`btn btn-outline-light mx-2 ${location.pathname==='/login' && "active" }`} to="/login" role="button">Login</Link>
            <Link className={`btn btn-outline-light mx-2 ${location.pathname==='/signup' && "active" }`} to="/signup" role="button">SignUp</Link>
            </div>:<button className='btn btn-outline-light mx-2' onClick={handleLogout}>LogOut</button>}
        </div>
    </div>
</nav>

  )
}

export default Navbar