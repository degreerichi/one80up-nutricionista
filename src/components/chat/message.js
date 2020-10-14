import React from "react";
import { MessageProps } from "./chat";

export const Message = (props: MessageProps)=>{

    return (
        <div className={`chat-message ${props.guest ? "guest" : ""}`}>
            <span className="chat-message-text">{props.texto}</span>
            <span className="chat-message-info">{props.emisor}, {props.hora}</span>
        </div>
    );

}