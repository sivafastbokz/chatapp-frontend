import React, { useState } from 'react';

function ChatApp(){
    const [socket,setSocket]=useState(null)
    const [message, setMessage] = useState('');

    const ws = new WebSocket('ws://localhost:5000')
    ws.onopen = ()=>{
        console.log('websocket connected')
        setSocket(ws)
    }
    const sendMessage = () => {
        if (socket && message.trim() !== '') {
          socket.send(message);
          setMessage('');
        }
      };
    return(
        <>
        <input type='text' onChange={(event)=>{setMessage(event.target.value)}}></input>
        <button onClick={sendMessage}>send</button>
        </>
    )
}
export default ChatApp;