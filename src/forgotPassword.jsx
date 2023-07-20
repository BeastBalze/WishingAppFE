import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
const Forgotpass = () => {
    const [email, setEmail] = useState("");
    const forgotPasswordfunc = async (email) => {
        try {
            const res = await axios.post('https://wishingapp.onrender.com/api/v1/password/forgot', {email})
            if(res.data.success) alert("Check your Mail");
        } catch (error) {
            alert(error.message);
        }
    };
    const subbmitHandeler = (e) => {
        e.preventDefault();
        forgotPasswordfunc(email);
    }
    return (
    <div className='fpbody'>
        <h1 className='fph1'>Forgot Password</h1>
        <p className='fpp'>Enter your email below to receive a password reset link:</p>
        <form className='fpform' action="#" method="post" onSubmit={subbmitHandeler}>
            <input className='fpinput' type="email" onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
            <button className='fpbutton' type="submit">Request Reset Link</button>
        </form>
    </div>
    )
}

export default Forgotpass