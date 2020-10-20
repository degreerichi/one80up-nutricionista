import Axios from "axios";

// const PROTOCOL = "http";
const PROTOCOL = "https";
// const HOST = `${PROTOCOL}://api.one80uplocal.com`;
export const HOST = `${PROTOCOL}://one80up-backend.herokuapp.com`;

const GET_CHAT_TOKEN = `${HOST}/api/generate_token_nutricionista`;
const GET_USUARIO_CHAT_INFO = `${HOST}/api/get_usuario_chat_info`;
const GET_NUTRICIONISTAS_USERS = `${HOST}/api/get_nutricionistas_users`;

// Default headers
const getHeaders = ()=>{
    return {
        "Content-type": "application/json",
        "Accept": "application/json"
    }
}

const maxAttempts = 3;

// Obtiene solicitudes desde el API, con la url dada, metodo y datos
const GetResponseFromApi = (url, method = "post", data = {}, attempt = 0)=>{

    return new Promise((resolve, reject)=>{
        Axios({
            url: url,
            method: method,
            headers: getHeaders(),
            data: data
        }).then((res)=>{
            resolve(res);
        }).catch((err)=>{
            if(attempt >= maxAttempts){
                reject(err);
            }else{
                attempt++;
                console.log(url, ` request failed, retrying... failed attempt number: ${attempt}`);
                GetResponseFromApi(url, method, data, attempt);
            }
        });
    });
}

export const GetChatToken = (data)=>{
    return GetResponseFromApi(GET_CHAT_TOKEN, "post", data);
}

export const GetUsuarioChatInfo = (data)=>{
    return GetResponseFromApi(GET_USUARIO_CHAT_INFO, "post", data);
}

export const GetNutricionistasUsers = ()=>{
    return GetResponseFromApi(GET_NUTRICIONISTAS_USERS, "get");
}