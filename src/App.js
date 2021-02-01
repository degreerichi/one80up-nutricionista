import React from 'react';
import { Home } from "./components/views/home";
// import { Select } from "./components/views/select";
import { Login } from "./components/views/authentication";
import { 
    BrowserRouter as Router,
    Redirect,
    // Route,
    Switch
} from "react-router-dom";
import { ProtectedRoute, RedirectIfAuthenticated } from "./components/auth/auth";

function App() {

	return (
		<div>
            <Router>
                <Switch>
                    <ProtectedRoute path="/chat">
                        <Home/>
                    </ProtectedRoute>
                    <RedirectIfAuthenticated path="/login">
                        <Login/>
                    </RedirectIfAuthenticated>
                    <ProtectedRoute path="/">
                        <Redirect to="/chat"/>
                    </ProtectedRoute>
                </Switch>
            </Router>
		</div>
	);
}

export default App;
