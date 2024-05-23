import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const hideNav = () => {
        let element = document.querySelector(".navbar-collapse");
        element.classList.remove("show");
    }

    const navigate = useNavigate();
    const logout = () => {
        if(localStorage.getItem('token')) {
            localStorage.removeItem('token')
            navigate("/login");
        } 
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item" onClick={hideNav}>
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            {
                                localStorage.getItem('token') ?
                                    (
                                        <>
                                            <li className="nav-item" onClick={hideNav}>
                                                <span className='nav-link' style={{ cursor: "pointer" }} onClick={logout}>Logout</span>
                                            </li>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <li className="nav-item" onClick={hideNav}>
                                                <NavLink className="nav-link" to="/login">Login</NavLink>
                                            </li>
                                            <li className="nav-item" onClick={hideNav}>
                                                <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                                            </li>
                                        </>
                                    )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
