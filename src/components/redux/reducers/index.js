import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";

const appReducers = combineReducers({
    logged: loginReducer,
    user: userReducer
});

const rootReducer = (state, action) => {
    return appReducers(state, action);
}

export default rootReducer;
