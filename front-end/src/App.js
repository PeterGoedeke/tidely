import React, { Component } from "react";

import "./App.css";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import LocationSearch from "./containers/LocationSearch";
import LocationTideData from "./containers/LocationTideData";

// This will need to be refractored so that it can be reused for both types of users --> Companies and Students
class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" component={LocationSearch} exact />
        <Route path="/tide-data" component={LocationTideData} exact />
        <Redirect to="/" />
      </Switch>
    );
    return <div className="App">{routes}</div>;
  }
}

export default App;
