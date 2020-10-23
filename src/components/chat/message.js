import React, { useEffect, useState } from "react";
import { MessageProps } from "./chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export const Message = (props: MessageProps)=>{

    let [image, setImage] = useState(null);

    useEffect(()=>{
        if(props.type === "media"){
            props.media.then((url)=>{
                setImage(url);
            });
        }
    })

    let messageBody = props.type === "media" ? (
        <>
            {image !== null ? (
                <a href={image} target="_blank" rel="noopener noreferrer" download={true}>
                    <img className="w-100 mb-2" src={image} alt=""/>
                </a>
            ) : (
                <span className="chat-message-text"><FontAwesomeIcon icon={faCircleNotch} spin={true} size="lg"/></span>
            )}
        </>
    ) : (
        <>
            <span className="chat-message-text">{props.texto}</span>
        </>
    );

    return (
        <div className={`chat-message ${props.guest ? "guest" : ""}`}>
            {messageBody}
            <span className="chat-message-info">{props.emisor}, {props.hora}</span>
        </div>
    );

}