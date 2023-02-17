import React, { useState, useEffect } from "react";
import io from 'socket.io-client'

const socket = io('http://localhost:7001')
// const userName = 'User '+parseInt(Math.random()*10)
var userName = localStorage.getItem("name");
// userName = userName.substring(1, userName.indexOf('@'));

function Chat() {
  
  
    
  
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', payload => {
      setChat([...chat, payload])
    })
  })

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message)
   
    socket.emit('message',{userName,message});
    setMessage('')
  };
  return (
    <>
    <h2 style={{textAlign:'center',padding:'1rem'}}>Chat App</h2>
    <div style={{display:'flex'}}>
    <div className="App" style={{margin:'auto',marginTop:'2rem', marginLeft:'2rem',height:'100%'}}>
      
      <form onSubmit={sendMessage} className="message-form" style={{position:'fixed',bottom:'1rem',color:'white'}}>
        <input type="text" name="message" style={{color:'black',padding:'2px',background:'transparent',borderBottom:'2px solid black',borderTop:'none',borderLeft:'none',borderRight:'none'}}
        className="typedMessage"
        placeholder='Type message'
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
        required
        ></input>
        <button className='submit' type='submit'style={{padding:'2px'}}>Send</button>
      </form>
      
      {chat.map((payload, index)=>{
        return(
          <div key={index} style={{display:'flex'}}>
            <p>{payload.userName}</p> 
            <h5> -> {payload.message}</h5></div>
        )
      })}
    </div>
    <div>
    <img src="https://i.ibb.co/9bz3Hd1/Whats-App-Image-2023-02-18-at-02-35-44-removebg-preview.png" alt="Whats-App-Image-2023-02-18-at-02-35-44-removebg-preview" border="0"/>
    </div>
    </div>
    </>
  );
}

export default Chat;
