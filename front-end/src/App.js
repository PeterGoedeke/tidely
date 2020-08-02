import React, { Component } from "react";

import { connect } from "react-redux";

import "./App.css";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import * as actions from "./store/actions/index";

import LocationSearch from "./containers/LocationSearch";
import LocationTideData from "./containers/LocationTideData";

// This will need to be refractored so that it can be reused for both types of users --> Companies and Students
class App extends Component {
  componentDidMount() {
    const tideData = JSON.parse(localStorage.getItem("tideData"));
    console.log(tideData);

    if (tideData) {
      this.props.fetchDataSuccess(tideData);
    }
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" component={LocationSearch} exact />
        <Route path="/tide-data" component={LocationTideData} exact />
        <Redirect to="/" />
      </Switch>
    );

    if (!this.props.tideData) {
      routes = (
        <Switch>
          <Route path="/" component={LocationSearch} exact />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <div className="App">{routes}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.tideData.loading,
    error: state.tideData.error,
    tideData: state.tideData.tideData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataSuccess: (inputLocation) =>
      dispatch(actions.fetchTideDataSuccess(inputLocation)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
