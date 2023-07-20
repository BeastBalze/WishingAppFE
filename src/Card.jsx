import React, { useState } from 'react'
import './App.css';
const array =  [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

const Card = ({obj, del, updateFunc, close, edit}) => {
  const [reciverMail, setmail] = useState("");
  const [date, setdate] = useState();
  const [ocassion, setOcassion] = useState();
  const [message, setMessage] = useState();
  const delId = `${obj._id}-d`;
  const editId = `${obj._id}-editBox`;
  return (
    <>
    <div className='del' id = {delId} >
      <p>Are you sure you want to delete this?</p>
      <div className="btns">
      <button onClick={() => del(obj._id)}>Yes</button>
      <button onClick={() => close(delId)}>No</button>
      </div>
    </div>
    <div className="edit" id={editId}>
      <a onClick={() => close(editId)}>close</a>
      <input type="mail" onChange={(e) => setmail(e.target.value)} placeholder='reciver Mail'/>
      <input type="Date" onChange={(e) => setdate(e.target.value)} />
      <input type="text" onChange={(e) => setOcassion(e.target.value)} placeholder='ocassion'/>
      <input type="text" onChange={(e) => setMessage(e.target.value)} placeholder='message'/>
      <button onClick={() => {updateFunc(obj._id, date, reciverMail, message, ocassion)}}>Update</button>
    </div>
    <div className='cardContainer'>
        <h2 className='cardName'>{obj.name}</h2>
        <h3>{obj.reciverMail}</h3>
        <h3>{obj.ocassion}</h3>
        <h3>{obj.day}, {array[obj.month - 1]}</h3>
        {/* <h3>date</h3> */}
        <p>{obj.message}</p>
        <button onClick={() => edit(editId)}>Edit</button>
        <button style={{width: "55px"}} onClick={() => edit(delId)}>Delete</button>
    </div>
    </>
  )
}

export default Card