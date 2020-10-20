import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faTimes, faChevronLeft, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Message } from "./message";

export type MessageProps = {
    texto: string,
    emisor: string,
    guest: boolean,
    hora: string
}

export type ChatListItem = {
    imagen: string,
    titulo: string,
    nombre: string,
    estado: string,
    hora: string
}

export type ChatProps = {
    loading: boolean,
    chatList: Array<ChatListItem>,
    messages: Array<MessageProps>,
    otherprops: string,
    onMessageSent: mixed,
    onChatChange: mixed,
    onAnyChatReturn: mixed,
    unreadMessagesStatus: Arrray<number>
};


export function Chat(props: ChatProps) {

    let [chatOpened, setChatOpened] = useState(false);
    let [chatActivo, setChatActivo] = useState(0);
    let [vistaActiva, setVistaActiva] = useState(0);
    let [currentText, setCurrentText] = useState('');
    let chatWindow = useRef();

    let vistaChatsHandler = (chat_id, vista) => {
        setChatActivo(chat_id);
        setVistaActiva(vista);
        if(props.onChatChange !== null 
            && props.onChatChange !== undefined
            && typeof props.onChatChange === "function"){
                props.onChatChange(chat_id);
            }
    }

    let vistaChats = (
        <div className="chat-list-wrapper">
            {props.chatList.length > 0 && props.chatList.map((c, i)=>{
                return (
                    <div className="chat-item" onClick={()=>{vistaChatsHandler(i, 1)}} key={i}>
                        <img className="chat-item-image" src={c.imagen} alt=""/>
                        <div className="chat-item-info">
                            <span className="chat-window-guest-title">{c.titulo}</span>
                            <span className="chat-window-guest-name">{c.nombre}</span>
                            <span className="chat-window-guest-state">{c.estado}</span>
                        </div>
                        {props.unreadMessagesStatus[chatActivo] > 0 && (
                            <div className="chat-item-badge">
                                <span className="chat-item-badge-text">{props.unreadMessagesStatus[chatActivo]}</span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    let messages = props.messages !== null 
        && props.messages !== undefined 
        && props.messages.length > 0 
        && props.messages.map((m, i) => {
        return (
            <Message {...m} key={i}/>
        );
    });

    let sendMessage = (e)=>{
        e.preventDefault();
        if(currentText === '') return;
        if(props.onMessageSent !== null 
        && props.onMessageSent !== undefined
        && typeof props.onMessageSent === "function") props.onMessageSent(currentText);
            setCurrentText('');
        if(chatWindow !== null)
            chatWindow.current.scrollTo(0, 0);
    }

    let returnToChatList = ()=>{
        vistaChatsHandler(0, 0);
        if(props.onAnyChatReturn !== null 
        && props.onAnyChatReturn !== undefined
        && typeof props.onAnyChatReturn === "function") props.onAnyChatReturn();
    }

    let vistaChat = (
        <>
            {props.chatList.length > 0 && props.chatList[chatActivo] !== null && (
                <>
                    <div className="chat-window-header" chatactivo={chatActivo}>
                        <a href="#!" className="chat-return-button" onClick={returnToChatList}>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </a>
                        <div className="chat-window-guest-data">
                            <img className="chat-window-image" src={props.chatList[chatActivo].imagen} alt=""/>
                            <div className="chat-window-guest-info">
                                <span className="chat-window-guest-title">Nutricionista</span>
                                <span className="chat-window-guest-name">{props.chatList[chatActivo].nombre}</span>
                                <span className="chat-window-guest-state">{props.chatList[chatActivo].estado}</span>
                            </div>
                        </div>
                    </div>
                    <div className="chat-window-messages-wrapper" ref={chatWindow}>
                        {messages}
                    </div>
                    <div className="chat-window-footer">
                        <form onSubmit={sendMessage}>
                            <input type="text" className="chat-input" placeholder="Escriba un mensaje..." value={currentText} onChange={(e)=>{setCurrentText(e.target.value)}}/>
                            <button type="submit" className="chat-send-button">
                                <FontAwesomeIcon icon={faPaperPlane}/>
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    );

    let vistasArray = {
        0: vistaChats,
        1: vistaChat
    }

    let preloader = (
        <div className="chat-preloader">
            <FontAwesomeIcon icon={faCircleNotch} spin={true} size="2x"/>
        </div>
    );

	let chatWrapper = !chatOpened ? null : (
		<div className="chat-window-wrapper">
			<div className="chat-window">
                {props.loading && preloader}
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

    let unreadMessagesBadge = (
        Array.isArray(props.unreadMessagesStatus) 
        ? (
            props.unreadMessagesStatus.length > 0
                ? props.unreadMessagesStatus.reduce((n, i) => {
                    return n + i;
                }, 0) > 0 ? <span className="chat-button-badge">{props.unreadMessagesStatus.reduce((n, i) => {
                    return n + i;
                }, 0)}</span> : ""
                : ""
        ) : ""
    );

	let button = (
		<a href="#!" className="chat-button" onClick={toggleChat}>
			{!chatOpened ? openIcon : closeIcon}
            {unreadMessagesBadge}
		</a>
	);

	return (
		<div className="chat">
			{button}
			{chatWrapper}
		</div>
	);
}