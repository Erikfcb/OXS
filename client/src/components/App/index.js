import React, { Component } from "react";
import Login from "../Login";
import Dashboard from "../Dashboard";
import { Router, Route, Switch } from "react-router-dom";
import history from '../../history'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/tenants" component={Dashboard} />
            <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
