import React from "react";
import "../../styles/auth.scss";
import { LaravelForm } from "@degreerichi/laravelform";
import { LOGIN } from "../api";
import { TOKEN } from "../../strings";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setUser } from "../redux/actions/authActions";

export const Login = () => {

    let history = useHistory();
    let dispatch = useDispatch();

    const onLoginDone = (res)=>{
        localStorage.setItem(TOKEN, res.data.token.accessToken);
        dispatch(login());
        dispatch(setUser(res.data.user));
        setTimeout(()=>{
            history.push("/chat");
        }, 500);
    }

    return(
        <div className="container d-flex flex-column align-items-center mt-5">
            <div className="card w-100" style={{maxWidth: "400px"}}>
                <div className="card-body">
                    <LaravelForm url={LOGIN} method="post" success={onLoginDone}>
                        <h2 className="card-title">Inicio de sesión</h2>
                        <span>Área de nutricionistas</span>
                        <br/>
                        <div className="form-group">
                            <label htmlFor="usuario">Usuario</label>
                            <input type="text" className="form-control" name="usuario" id="usuario" placeholder="jdoe"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">Contraseña</label>
                            <input type="password" className="form-control" name="pass" id="pass" placeholder="**********"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Ingresar</button>
                    </LaravelForm>
                </div>
            </div>
        </div>
    );

}