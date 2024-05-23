import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NoteContext from '../context/noteContext';
import Alert from './Alert';

const Login = () => {
    const context = useContext(NoteContext);
    const { showAlert, alert } = context;

    document.title = "iNoteBook | Login"
    const host = "http://localhost:5000";
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API call
        const url = `${host}/api/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // redirect to home page and save token in local storage
            localStorage.setItem('token', json.token);
            showAlert("Logged in successfull", "success");
            navigate("/");
        }
        else {
            showAlert(json.errors[0].msg, "danger");
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Alert alert={alert} />
            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit} className="border border-2 border-primary-subtle p-3 my-5 rounded col-12 col-md-6">
                    <h4 className='mb-3 text-center text-primary'>Login</h4>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onchange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onchange} required />
                    </div>
                    <button type="submit" className="mt-3 btn btn-sm btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login
