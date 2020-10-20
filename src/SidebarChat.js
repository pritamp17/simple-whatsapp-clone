import React from 'react';
import {Avatar} from "@material-ui/core"
import "./SidebarChat.css";


function SidebarChat() {
    return (
        <div className="SidebarChat">
        <Avatar/>
        <div className="SidebarChat__info">
        <h2> Room name</h2>
        <p>this is the last message</p>
        </div>
        </div>
    )
}

export default SidebarChat
