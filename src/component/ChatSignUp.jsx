import React, { useState } from 'react';
import ChatApp from './Chat';
import './chatSignUp.css'

function ChatSignUp(){
    const[userName,setUserName]=useState('');
    const[showChat, setShowChat]=useState(false);

    const joinChat = ()=>{
        if(userName !== ''){
            setShowChat(true)
        }
    }
    return(
        <>
        {!showChat ?(
            <div className='container'>
            <div className='container-item'>
            <label>Please enter your name to join the chat</label>
            <br/>
            <input type='text' placeholder='Enter your name'onChange={(event)=>{setUserName(event.target.value)}}/>
            <br/>
            <button onClick={joinChat}>JOIN</button>
            </div>    
            </div>
        ):(
            <ChatApp userName={userName}/>
        )}
        </>
    )
}
export default ChatSignUp;