import React, { useState, useEffect } from 'react';
import "../../style/style.scss";
import { Chat } from "../chat";
import { 
	GetChatToken, 
	GetUsuarioChatInfo 
} from "../api";
import TwilioChat from "twilio-chat";
import moment from "moment";
import { useParams, Link } from "react-router-dom";
import "../../styles/home.scss";

// const user = {
// 	usuario: 'mhelena'
// }

function Home() {

	let [loadingChatToken, setLoadingChatToken] = useState(true);
	let [loadingChats, setLoadingChats] = useState(true);
    let [chats, setChats] = useState([]);
    let [messages, setMessages] = useState([]);
    let [chatActive, setChatActive] = useState(null);
    let { usuario_nutricionista } = useParams();
	
	async function setupTwilioClient(c){

        async function requestUsuarioInfo(usuario, estado, hora){
            return await GetUsuarioChatInfo({
                "usuario": usuario
            }).then((res)=>{
                return {
                    id: res.data.usuario.cod_usuario,
                    cargando: true,
                    imagen: res.data.usuario.foto_perfil,
                    titulo: 'Cliente',
                    nombre: res.data.usuario.nombre1 + " " + res.data.usuario.apellido1,
                    estado: estado,
                    hora: hora,
                }
            });
        }

        let subscribedChannelsRaw = await c.getSubscribedChannels();

        let preparedChats = [];

        for(let channel of subscribedChannelsRaw.items){

			let members = await channel.getMembers();

			let usuario = members.find((m)=>{
				return m.state.identity !== usuario_nutricionista
			});

            let usuariosInfo = await requestUsuarioInfo(
                usuario.state.identity,
                channel.channelState.status,
                ''
            );
            usuariosInfo = {
                ...usuariosInfo,
                twilioChannel: channel
            };
            channel.on('messageAdded', onMessageReceived);
            preparedChats.push(usuariosInfo);
        }

        setChats(preparedChats);
        setLoadingChats(false);

    }

	let changeChannel = (channel_index)=>{
        setChatActive(channel_index);
		fetchMessagesForCurrentChannel(channel_index);
	}
	
	let onSendMessageHandler = (channel, text)=>{

        // let auxMessages = messages;
        // let tempSid = "tempSID" + randomNumber(10000, 99999);

        // auxMessages.unshift({
        //     sid: tempSid,
        //     texto: text,
        //     emisor: user.usuario,
        //     guest: false,
        //     hora: "Enviando..."
        // });

        // setMessages(auxMessages);

        channel.sendMessage(text).then(()=>{

            fetchMessagesForCurrentChannel(chatActive);

        });
	}
	
	async function fetchMessagesForCurrentChannel(index){

        let rawMessages = [];
        if(typeof chats[index].twilioChannel === "object")
            rawMessages = await chats[index].twilioChannel.getMessages();
       
        console.log(rawMessages);
        let messages = rawMessages.items.map((m, i)=>{
            return {
                sid: m.state.sid,
                texto: m.state.body,
                emisor: m.state.author,
                guest: m.state.author !== usuario_nutricionista,
                hora: moment(m.state.timestamp).format('MMM dd, yyyy hh:mm a')
            }
        });

        setMessages(messages.reverse());

	}

	let randomNumber = (min, max) => {
        return Math.random() * (max - min) + min;
	}
	
    
    let onMessageReceived = (message)=>{
        pushMessageToState(message);
    }

    let pushMessageToState = (m)=>{

        let newMessages = messages;

        newMessages.unshift({
            sid: m.state.sid,
            texto: m.state.body,
            emisor: m.state.author,
            guest: m.state.author !== usuario_nutricionista,
            hora: moment(m.state.timestamp).format('MMM dd, yyyy hh:mm a')
        });

        setMessages(newMessages);
        
    }
	
	useEffect(()=>{
		GetChatToken({ usuario: usuario_nutricionista }).then((res)=>{
            TwilioChat.create(res.data.token).then(c => setupTwilioClient(c));
            setLoadingChatToken(false);
        }).catch((err)=>{
            console.log('fallo aca');
            console.log(err);
		});
		// eslint-disable-next-line
	}, []);

	return (
		<div className="home">
            <Link className="button" to="/">Regresar</Link>
            <br/>
            <h2>Instrucciones</h2>
            <p>
                Ahora mismo está viendo la demo del chat de {usuario_nutricionista}.
                Lo que debe hacer es <b>abrir el chat</b> que aparece en la esquina inferior derecha y ver cómo luce el chat para ese nutricionista.
            </p>
			<Chat 
				onChatChange={changeChannel}
				onMessageSent={(text)=>{onSendMessageHandler(chats[chatActive].twilioChannel, text)}}
				loading={loadingChatToken || loadingChats} 
				chatList={chats}
				messages={messages}/>
		</div>
	);
}

export { Home };
