import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import * as actions from "../store/actions/index";
import classes from "./LocationSearch.module.css";

import * as locations from "../assets/beaches/beaches.json";

import tidelyLogo from "../assets/icons/logo.png";
import lightWave from "../assets/background-images/lightwave.png";
import darkWave from "../assets/background-images/darkwave.png";
import searchIcon from "../assets/icons/search-2.png";

class LocationSearch extends Component {
  state = {
    autocomplete: "",
    inputValue: "",
  };

  componentDidMount() {
    //
    console.log(locations.default);
  }

  inputFeedAutocomplete = (input) => {
    for (let location of locations.default) {
      //console.log(locations.default[i]);
      //console.log(input);
      //console.log(location);
      if (input && location.toLowerCase().startsWith(input.toLowerCase())) {
        let temp;
        temp = input + location.slice(input.length, location.length);
        this.setState({
          autocomplete: temp,
        });
        return;
      }
      this.setState({
        autocomplete: "",
      });
    }
    //console.log(this.state.autocomplete);
    //Clearing
    // hintInput.value = "";
    if (input === "") {
      this.setState({
        autocomplete: "",
      });
    }
  };

  inputChangeHanlder = (event) => {
    this.inputFeedAutocomplete(event.target.value);
    this.setState({
      inputValue: event.target.value,
    });
  };

  submitLocation = (event) => {
    event.preventDefault();

    // Check that it is not empty
  };

  render() {
    console.log(this.state.autocomplete);
    return (
      <div className={classes.LocationSearch}>
        <img className={classes.Logo} src={tidelyLogo} alt="Tidely Logo" />
        <div className={classes.SearchContainer}>
          <div className={classes.SearchPrompt}>
            What's the <strong>tide</strong> like at the...
          </div>
          <div className={classes.InputContainer}>
            <input
              className={classes.TopLevelInput}
              placeholder="Enter a beach location"
              value={this.state.inputValue}
              onChange={(event) => this.inputChangeHanlder(event)}
            />
            <input
              className={classes.BottomLevelInput}
              disabled
              value={this.state.autocomplete}
            />
            <img src={searchIcon} className={classes.SearchIcon} />
          </div>
        </div>
        <img className={classes.LightWave} src={lightWave} />
        <img className={classes.DarkWave} src={darkWave} />
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
