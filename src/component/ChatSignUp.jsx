import React, { useState } from 'react';
import ChatApp from './Chat';
import './chatSignUp.css'

function ChatSignUp(){
    const[userName,setUserName]=useState('');
    const[showChat, setShowChat]=useState(false);
    const[roomId,setRoomId]=useState('');

    const joinChat = ()=>{
        if(userName !== '' && roomId !==''){
            setShowChat(true)
        }
    }
    return(
        <>
        {!showChat ?(
            <div className='container'>
            <div className='container-item'>
            <label>Join a chat</label>
            <br/>
            <input type='text' placeholder='Enter your name'onChange={(event)=>{setUserName(event.target.value)}}/>
            <input type='text' placeholder='Enter your room ID'onChange={(event)=>{setRoomId(event.target.value)}}/>
            <button onClick={joinChat}>JOIN</button>
            </div>    
            </div>
        ):(
            <ChatApp userName={userName} roomId={roomId}/>
        )}
        </>
    )
}
export default ChatSignUp;