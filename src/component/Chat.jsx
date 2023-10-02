import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './chat.css'

function ChatApp({userName,roomId}){
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
          const messageData = {
            author:userName,
            room:roomId,
            message:message,
            time:new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
          };
          await socket.send(JSON.stringify(messageData))
          setMessage('')
      };
      
    return(
        <>
        <div className='chat-window'>
        <div className='chat-header'>
          <p>Live Chat</p>
        </div>
        <div className='chat-body'>
          <ScrollToBottom className='message-container'>
         {messageList.map((messageContent,index)=>(
           <div
           className='message'
           id={userName === messageContent.author ? 'you' : 'other'}
           key={index}
         >
           <div>
             <div className='message-content'>
               <p>{messageContent.message}</p>
             </div>
             <div className='message-meta'>
               <p id='time'>{messageContent.time}</p>
               <p id='author'>{messageContent.author}</p>
             </div>
           </div>
         </div>
         ))}
         </ScrollToBottom>
        </div>
        <div className='chat-footer'>
        <input type='text' placeholder='Hey...' value={message} onChange={(event)=>{setMessage(event.target.value)}} className='chat-footer-input'></input>
        <button onClick={sendMessage} className='chat-footer-send-btn'>&#9658;</button>
        </div>
        </div>
        </>
    )
}
export default ChatApp;