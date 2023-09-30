import React, { useEffect, useState } from 'react';
import './chat.css'


function ChatApp({userName}){
    const [socket,setSocket]=useState(null)
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(()=>{
      const ws = new WebSocket('ws://localhost:5000');
       ws.onopen = ()=>{
        console.log('websocket connected')
        setSocket(ws)
    }
    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessageList((list) => [...list, messageData]);
    };
    },[])

    const sendMessage = async() => {
        if (socket && message.trim() !== '') {
          const messageData = {
            author:userName,
            message:message,
            time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
          };
          await socket.send(JSON.stringify(messageData))
        }
      };
    return(
        <>
        <div className='chat-window'>
        <div className='chat-header'>
          <p>Live Chat</p>
        </div>
        <div className='chat-body'>
        {messageList.map((messageData, index) => (
          <div className="message" key={index}>
            <p>
              <strong>{messageData.author}</strong> {messageData.time}
            </p>
            <p>{messageData.message}</p>
          </div>
        ))}
        </div>
        <div className='chat-footer'>
        <input type='text' onChange={(event)=>{setMessage(event.target.value)}} className='chat-footer-input'></input>
        <button onClick={sendMessage} className='chat-footer-send-btn'>&#9658;</button>
        </div>
        </div>
        </>
    )
}
export default ChatApp;