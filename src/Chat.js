import { Avatar, IconButton } from '@material-ui/core'
import React, {useState} from 'react'
import "./Chat.css"
import axios from './axios'

import { SearchOutlined, AttachFile, MoreVert,InsertEmoticon, Message} from '@material-ui/icons';
import MicIcon from  '@material-ui/icons/Mic';

function Chat({messages}) {

    const [input, setInput] = useState('')
    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new',{
            message: input ,
            name: "Demo app",
            timestamp: "just NOw",
            received: false,
        });

        setInput('');

    }
    return (
        <div className='chat'>

           <div className='chat__header'>
            <Avatar/>

            <div className='chat__headerInfo'>
                <h3>Room Name </h3>
                <p>Last seen at ...</p>
            </div>

            <div className='chat__headerRight'>

            <IconButton>
                  <SearchOutlined/>      
            </IconButton>

            <IconButton>
                  <AttachFile/>      
            </IconButton>

            
            <IconButton>
                  <MoreVert/>      
            </IconButton>


            
             </div>

         </div>

         <div className='chat__body'>
            {messages.map( (message)=>{
                return(
       <p  className={`chat__message ${message.received && "chat__reciever"}`}> 
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timeStamp'>
                {message.timestamp}
            </span>
            
            </p>)

            })}
 

         </div>

         <div className='chat__footer'>
         <InsertEmoticon/>

                <form >
                <input 
                value={input} onChange={e => setInput(e.target.value)}
                placeholder="Type a message"
                type="text"
                />
                <button onClick={sendMessage}
                type="submit">Send a message</button>
                </form>
            <MicIcon/>
         </div>
        </div>
    )
}

export default Chat;
