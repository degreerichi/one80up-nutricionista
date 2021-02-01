import Axios from "axios";
import { TOKEN } from "../../strings";

const PROTOCOL_UNSECURE = "http";
// const PROTOCOL_SECURE = "https";
// const HOST = `${PROTOCOL_UNSECURE}://api.one80uplocal.com`;
export const HOST = `${PROTOCOL}://one80up-backend.herokuapp.com`;

const API_BASE = `${HOST}/api`;
const API_AUTH_BASE = `${HOST}/api/nutricionista`;

export const CHECK_AUTH = `${API_AUTH_BASE}/check`;
export const LOGIN = `${API_AUTH_BASE}/login`;
const GET_CHAT_TOKEN = `${API_BASE}/generate_token_nutricionista`;
const GET_USUARIO_CHAT_INFO = `${API_BASE}/get_usuario_chat_info`;
const GET_NUTRICIONISTAS_USERS = `${API_BASE}/get_nutricionistas_users`;
const GET_USER_AUTH = `${API_AUTH_BASE}/get_user_auth`;

// Default headers
const getHeaders = ()=>{
    return {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem(TOKEN)}`
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

export const GetUserAuth = ()=>{
    return GetResponseFromApi(GET_USER_AUTH, "get");
}