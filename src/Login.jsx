import React, { useState } from 'react'
import axios from 'axios';
import './App.css'
import Cookies from 'universal-cookie';
const Login = ({ setLogged, setRegist }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const LoginFunc = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:4000/api/v1/login', { email, password, Credential: true });
      // console.log(res.data.token);
      if (res.data.success) {
        const cookies = new Cookies();
        cookies.set("token", res.data.token, {
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });
      }
      setLogged(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  const LoginHandeler = (e) => {
    e.preventDefault();
    LoginFunc(email, password);
  }

  return (
    <div id="forms-back">
      <h2 id="login"><b>LogIn</b></h2>
      <div id='forms-container'>
        <form action="#" method="post" onSubmit={LoginHandeler}>
          <div id="inputs">
            <i class="fas fa-envelope"></i>
            <input type="mail" onChange={(e) => setEmail(e.target.value)} placeholder="usermail@mail.com" name="email"></input>
          </div>
          <div id="inputs">
            <i class="fas fa-unlock"></i>
            <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" name="password"></input>
          </div>
          <div id="sub">
            <input style={{ width: "200px", marginLeft: "1em", height: "3em" }} type="submit" value="Log In"></input>
          </div>
        </form>
        <a style={{paddingTop:"12px", marginLeft: "auto", marginRight: "auto" }} href="/password/forgot">Forgot Password</a>
        <div id="sub">
          <p id="regist" >New Here? <a style={{textDecoration:"underline"}} onClick={() => setRegist(true)}>Register</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login