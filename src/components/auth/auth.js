import React, { useEffect } from "react";
import Axios from "axios";
import { CHECK_AUTH } from "../api/index";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { login, unauthorized } from '../redux/actions/authActions';
import { TOKEN } from "../../strings";

export const Authenticator = {
    authenticate(){
        return new Promise((resolve, reject)=>{
            if(localStorage.getItem(TOKEN) == null) reject('Unauthenticated');
            Axios({
                url: CHECK_AUTH,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem(TOKEN)}`
                }
            }).then((res)=>{
                resolve(res);
            }).catch((err)=>{
                reject(err);
            });
        });
    }
}

export const ProtectedRoute = ({children, ...rest})=>{

    const isLogged = useSelector(state => state.logged);
    const dispatch = useDispatch();

    useEffect(()=>{
        Authenticator.authenticate().then(()=>{
            dispatch(login());
        }).catch(()=>{
            dispatch(unauthorized());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <Route
            {...rest}
            render={()=>{
                return isLogged ? children : <Redirect to="/login"/>;
            }}
        />
    )
}

export const RedirectIfAuthenticated = ({children, ...rest})=>{

    const isLogged = useSelector(state => state.logged);
    const dispatch = useDispatch();

    useEffect(()=>{
        Authenticator.authenticate().then(()=>{
            dispatch(login());
        }).catch((err)=>{
            dispatch(unauthorized());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <Route
            {...rest}
            render={()=>{
                return !isLogged ? children : <Redirect to="/chat"/>;
            }}
        />
    );
}