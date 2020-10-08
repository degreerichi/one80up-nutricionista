import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faTimes, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export function Chat() {

    let [chatOpened, setChatOpened] = useState(false);
    let [chatActivo, setChatActivo] = useState();
    let [vistaActiva, setVistaActiva] = useState(0);

    let vistaChatsHandler = (chat_id, vista) => {
        setChatActivo(chat_id);
        setVistaActiva(vista);
    }

    let vistaChats = (
        <div className="chat-list-wrapper">
            <div className="chat-item" onClick={()=>{vistaChatsHandler(1, 1)}}>
                <img className="chat-item-image" src="https://picsum.photos/200/200" alt=""/>
                <div className="chat-item-info">
                    <span className="chat-window-guest-title">Nutricionista</span>
                    <span className="chat-window-guest-name">Jane Maria Doe</span>
                    <span className="chat-window-guest-state">En línea</span>
                </div>
                <div className="chat-item-time">
                    <span className="chat-item-time-text">12:00 pm</span>
                </div>
            </div>
        </div>
    );

    let vistaChat = (
        <>
            <div className="chat-window-header">
                <a href="#!" className="chat-return-button" onClick={()=>{vistaChatsHandler(0, 0)}}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </a>
                <div className="chat-window-guest-data">
                    <img className="chat-window-image" src="https://picsum.photos/200/200" alt=""/>
                    <div className="chat-window-guest-info">
                        <span className="chat-window-guest-title">Nutricionista</span>
                        <span className="chat-window-guest-name">Jane Maria Doe</span>
                        <span className="chat-window-guest-state">En línea</span>
                    </div>
                </div>
            </div>
            <div className="chat-window-messages-wrapper">
                <div className="chat-message guest">
                    <span className="chat-message-text">Este es el primer mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message guest">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message guest">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message guest">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message guest">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message guest">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
                <div className="chat-message">
                    <span className="chat-message-text">Este es el texto del mensaje</span>
                    <span className="chat-message-info">Jane Doe, 12:00 pm</span>
                </div>
            </div>
            <div className="chat-window-footer">
                <input type="text" className="chat-input" placeholder="Escriba un mensaje..."/>
                <a href="#!" className="chat-send-button">
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </a>
            </div>
        </>
    );

    let vistasArray = {
        0: vistaChats,
        1: vistaChat
    }

	let chatWrapper = !chatOpened ? null : (
		<div className="chat-window-wrapper">
			<div className="chat-window">
                {vistasArray[vistaActiva]}
			</div>
		</div>
	);

	let toggleChat = () => {
		setChatOpened(!chatOpened)
	};

	let openIcon = (
		<span className="chat-button-icon">
			<FontAwesomeIcon icon={faComments} size="lg"/>
		</span>
	);

	let closeIcon = (
		<span className="chat-button-icon">
			<FontAwesomeIcon icon={faTimes} size="lg"/>
		</span>
	)

	let button = (
		<a href="#!" className="chat-button" onClick={toggleChat}>
			{!chatOpened ? openIcon : closeIcon}
		</a>
	);

	return (
		<div className="chat">
			{button}
			{chatWrapper}
		</div>
	);
}