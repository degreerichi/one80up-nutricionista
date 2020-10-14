import React from 'react';
import { Home } from "./components/views/home";
import { Select } from "./components/views/select";
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

function App() {

	return (
		<div>
            <Router>
                <Switch>
                    <Route path="/chat/:usuario_nutricionista">
                        <Home/>
                    </Route>
                    <Route path="/">
                        <Select/>
                    </Route>
                </Switch>
            </Router>
		</div>
	);
}

export default App;
