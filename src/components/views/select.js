import React, { useState, useEffect, useRef } from "react";
import { GetNutricionistasUsers } from "../api";
import { GET_CHAT_USUARIO_ROUTE } from "../routes";
import { useHistory } from "react-router-dom";
import "../../styles/select.scss";

const Select = () => {

    let select = useRef();
    let history = useHistory();
    let [nutricionistasUsers, setNutricionistasUsers] = useState([]);

    useEffect(()=>{
        GetNutricionistasUsers().then((res)=>{
            setNutricionistasUsers(res.data.nutricionistas);
        });
    }, []);

    let options = nutricionistasUsers.length > 0 && nutricionistasUsers.map((n)=>{
        return <option value={n}>{n}</option>
    });

    let navigate = ()=>{
        history.push(GET_CHAT_USUARIO_ROUTE(select.current.value));
    }

    return (
        <div className="the-select">
            <select name="" id="" defaultValue="" onChange={navigate} ref={select}>
                <option value="" disabled>{nutricionistasUsers.length > 0 ? `Seleccione un nutricionista` : 'Cargando nutricionistas...'}...</option>
                {options}
            </select>
        </div>
    );
}
export { Select }