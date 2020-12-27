import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Edit from "./Components/Edit";
import Table from "./Components/Display";
import User from "./Components/User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/reg" component={Register} />
          <Route exact path="/dis" component={Table} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route path="/user/:id" component={User} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
