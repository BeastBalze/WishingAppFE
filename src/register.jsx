import React, { useState } from 'react'
import './App.css'
import axios from 'axios'

const Register = ({setRegist}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const registerFunc = async(name, email, password) => {
        try {
            await axios.post('http://localhost:4000/api/v1/register', {name, email, password});
        } catch (error) {
            alert(error.message);
        }
    }

    const registerHandeler = () => {
        if(password === cpassword)
        {
            registerFunc(name, email, password);
            setRegist(false);
        }
        else {
            alert("Password and Confirmed password are different");
        }
    }

    return (
    <div id='forms-back'>
        <h2 id="login"><b>SignUp</b></h2>
        <div id="forms-container">
            <form action="#" method="post" onSubmit={registerHandeler}>
                <div id="inputs">
                    <i class="fas fa-user"></i>                    
                    <input type="text" onChange={(e) => setName(e.target.value)} placeholder="User Name" required></input>
                </div>  
                <div id="inputs">
                    <i class="fas fa-envelope"></i>
                    <input type="mail" onChange={(e) => setEmail(e.target.value)} placeholder="usermail@mail.com"required></input>
                </div>
                <div id="inputs">
                    <i class="fas fa-unlock"></i>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required></input>
                </div>
                <div id="inputs">
                    <i class="fas fa-unlock"></i>
                    <input type="password" onChange={(e) => setCpassword(e.target.value)} placeholder="Confirm Password" required></input>
                </div>
                <div id="inputs">
                    <input style={{width:"200px", marginLeft:"1em"}} type="submit" value="Register"></input>
                </div>
            </form>
            <div id="sub">
                <p id="regist">Already Have an Account? <a style={{textDecoration:"underline"}} onClick={() => setRegist(false)}>LogIn</a></p>
            </div>
        </div>
        
    </div>
  )
}

export default Register