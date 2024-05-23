import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/noteContext';
import Alert from './Alert';

const Signup = () => {

    const context = useContext(NoteContext);
    const { showAlert, alert } = context;

    document.title = "iNoteBook | SignUp"
    const host = "http://localhost:5000";
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ FullName: "", email: "", password: "", cpassword: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password === credentials.cpassword) {
            // API call
            const url = `${host}/api/auth/createUser`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: credentials.FullName, password: credentials.password, email: credentials.email }),
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                // Redirect to login page
                showAlert("Account create successfull", "success");
                navigate("/login");
            }
            else {
                showAlert(json.errors[0].msg, "danger")
            }
        } else {
            showAlert("Password not same", "danger");
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Alert alert={alert}/>
            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit} className="border border-2 border-primary-subtle p-3 my-5 rounded col-12 col-md-6">
                    <h4 className='mb-3 text-center text-primary'>Sign Up</h4>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" name='FullName' value={credentials.FullName} onChange={onchange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onchange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' minLength={8} value={credentials.password} onChange={onchange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name='cpassword' minLength={8} value={credentials.cpassword} onChange={onchange} required />
                    </div>
                    <button disabled={credentials.password.length < 8 || credentials.email.length < 10} type="submit" className="mt-3 btn btn-sm btn-primary no-drop-cursor">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup
