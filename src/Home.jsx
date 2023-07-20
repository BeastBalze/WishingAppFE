import React, { useEffect, useState } from 'react'
import Card from './Card';
import axios from 'axios';
import './App.css'
import Cookies from 'universal-cookie';
import LoadingAnimation from './LoadingAnimation';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSquarePlus, faCircleUser } from '@fortawesome/free-solid-svg-icons'

const Home = ({ setLogged, logged }) => {
  const [isLoading, setLoading] = useState(false);
  const [wishes, setwishes] = useState([]);
  const [reciverMail, setreciverMail] = useState("");
  const [date, setdate] = useState();
  const [ocassion, setocassion] = useState("");
  const [message, setmessage] = useState("");
  const [tobewished, settobewished] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOP] = useState("");
  const [newPassword, setNP] = useState("");
  const getall = async () => {
    if (!logged) {
      setwishes([]);
      return;
    };
    setLoading(true);
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      const res = await axios.put("https://wishingapp.onrender.com/api/v1/getall", { token });
      setwishes(res.data.list);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getall();
  }, [logged])
  
  const createFunc = async () => {
    close("createBox");
    try {
      setLoading(true);
      const cookies = new Cookies();
      const token = cookies.get('token');
      console.log(date);
      const day = date.split('-')[2];
      const month = date.split('-')[1];
      await axios.post("https://wishingapp.onrender.com/api/v1/create", { day, month, reciverMail, message, ocassion, name: tobewished, token });
      getall();
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }
  const createHandeler = (e) => {
    e.preventDefault();
    createFunc(date, reciverMail, message, ocassion, tobewished);
  }

  const del = async (id) => {
    close(`${id}-d`);
    setLoading(true);
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      console.log(token);
      const url = `https://wishingapp.onrender.com/api/v1/delete/${id}`;
      await axios.put(url, { token });
      getall();
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  const updateFunc = async (id, date, reciverMail, message, ocassion) => {
    close(`${id}-editBox`);
    setLoading(true);
    const cookies = new Cookies();
    const token = cookies.get('token');
    var day = 0, month = 0;
    if(date) {
      day = date.split('-')[2];
      month = date.split('-')[1];
    }
    try {
      await axios.put(`https://wishingapp.onrender.com/api/v1/edit/${id}`, { day, month, reciverMail, message, ocassion, token });
      getall();
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  const updateProfileFunc = async (name, email) => {
    close("upBox");
    setLoading(true);
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      await axios.put("https://wishingapp.onrender.com/api/v1/update/profile", {token, name, email});
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  const updatePassFunc = async (oldPassword, newPassword) => {
    close("delBox");
    setLoading(true);
    try {
      const cookies = new Cookies();
      const token = cookies.get('token');
      console.log("fkhlk");
      await axios.put("https://wishingapp.onrender.com/api/v1/update/password", {token, oldPassword, newPassword});
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  const logOutFunc = () => {
    const cookies = new Cookies();
    cookies.remove('token');
    setLogged(false);
  }

  const edit = (id) => {
    const editDiv = document.getElementById(id);
    editDiv.style.display = "flex";
  }

  const close = (id) => {
    const editDiv = document.getElementById(id);
    editDiv.style.display = "none";
  }
  return (
    <>
      {isLoading ? <LoadingAnimation/> : (<>
      <div className="edit" id='upBox'>
        <a onClick={() => close('upBox')}>close</a>
        <input type='text' onChange={(e) => { setName(e.target.value) }} placeholder='Name' />
        <input type="mail" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
        <button onClick={() => { updateProfileFunc(name, email) }}>Update</button>
      </div>
      <div className="edit" id='delBox'>
        <a onClick={() => close("delBox")}>close</a>
        <input type='pasword' onChange={(e) => setOP(e.target.value)} placeholder='Old password' />
        <input type='pasword' onChange={(e) => setNP(e.target.value)} placeholder='New Password' />
        <button onClick={() => { updatePassFunc(oldPassword, newPassword) }}>Update</button>
      </div>
      <div className="edit" id='createBox'>
        <a onClick={() => close("createBox")}>close</a>
        <form action='#' method='post' onSubmit={createHandeler}>
          <input type="text" onChange={(e) => { settobewished(e.target.value) }} name='name' placeholder='Name' required />
          <input type="mail" onChange={(e) => setreciverMail(e.target.value)} name='reciverMail' placeholder='reciver Mail' required />
          <input type="Date" onChange={(e) => setdate(e.target.value)} name='date' required />
          <input type="text" onChange={(e) => setocassion(e.target.value)} name="ocassion" placeholder='ocassion' required />
          <input type="text" onChange={(e) => setmessage(e.target.value)} name='message' placeholder='message' required />
          <button style={{display:"block"}}>Create</button>
        </form>
      </div>
      <div className='home'>
        <div className='create' onClick={() => edit('createBox')}><FontAwesomeIcon icon={faSquarePlus} /> Create</div>
        <div>Wishing App</div>
        <div className='accBox'>
          <div onClick={() => {
            var dis = document.getElementById('op');
            console.log(dis.style.display);
            if(dis.style.display === 'none') dis.style.display = "flex";
            else dis.style.display = 'none';
          }}><FontAwesomeIcon style={{position : "absolute", top: "14px", right:"16px"}} icon={faCircleUser} /></div>
          <div style={{height: "25px"}}></div>
          <div id='op'>
            <div onClick={() => edit("upBox")}>Update Profile</div>
            <div onClick={() => edit("delBox")}>Update Password</div>
            <div onClick={() => logOutFunc()}>Log Out</div>
          </div>
        </div>
      </div>
      <div className='cardBox'>
        {
          wishes && wishes.length > 0 ? (
            wishes.map((wish) => (
              <Card
                key={wish._id}
                obj={wish}
                del={del}
                updateFunc={updateFunc}
                close={close}
                edit={edit}
              />
            ))
          ) : (
            <div>Loading...</div>
          )
        }
      </div>
    </>)}
    </>
  )
}
export default Home