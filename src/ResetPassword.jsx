import React, { useState } from 'react'
import './App.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const ResetPassword = () => {
    const params = useParams();
    const [success, setSuccess] = useState(true);
    const [password, setP] = useState("");
    const [cPassword, setCP] = useState("");
    const token = params.token;
    const resetPasswordfunc = async (password) => {
        try {
            const res = await axios.put(`https://wishingapp.onrender.com/api/v1/password/reset/${token}`, {password})
            if(res.data.success) setSuccess(true);
        } catch (error) {
            alert(error.message);
        }
    };
    const subbmitHandeler = (e) => {
        e.preventDefault();
        if(password === cPassword) resetPasswordfunc(password);
        else alert("Both Passwords Must be same")
    }
    return (
        <div class="rpcontainer">
        <form class="reset-form" onSubmit={subbmitHandeler}>
        <h2>Reset Password</h2>
        <input type="password" onChange={(e) => setP(e.target.value)} placeholder="New Password" required />
        <input type="password" onChange={(e) => setCP(e.target.value)} placeholder="Confirm New Password" required />
        <button type="submit">Reset Password</button>
        </form>
        {success? (<Link className='rpa' to='/'>Go to Login Page</Link>): null}
    </div>
  )
}

export default ResetPassword