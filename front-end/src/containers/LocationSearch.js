import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import * as actions from "../store/actions/index";
import classes from "./LocationSearch.module.css";

import * as locations from "../assets/beaches/beaches.json";

class LocationSearch extends Component {
  state = {};

  componentDidMount() {
    //
    console.log(locations[0]);
  }

  submitLocation = (event) => {
    event.preventDefault();

    // Check that it is not empty
  };

  render() {
    return (
      <div className={classes.LocationSearch}>
        <div className={classes.SearchContainer}>
          <div className={classes.SearchPrompt}>What is the <strong>tide</strong> like at the...</div>
          <div className={classes.SearchBar}>search bar</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.tideData.loading,
    error: state.tideData.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTideData: (inputLocation) =>
      dispatch(actions.fetchTideData(inputLocation)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LocationSearch)
);
