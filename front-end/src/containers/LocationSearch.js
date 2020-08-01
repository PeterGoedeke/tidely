import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import * as actions from "../store/actions/index";
import classes from "./LocationSearch.module.css";

import * as locations from "../assets/beaches/beaches.json";

import tidelyLogo from "../assets/icons/logo.png";
import lightWave from "../assets/background-images/lightwave.png";
import darkWave from "../assets/background-images/darkwave.png";

import crossIcon from "../assets/icons/cross.png";
import searchIcon from "../assets/icons/search-2.png";

import Spinner from "../components/UI/Spinner";

class LocationSearch extends Component {
  state = {
    autocomplete: "",
    inputValue: "",
    autoLocations: [],
  };

  componentDidMount() {
    window.addEventListener("keydown", this.onTabKey, false);
    window.addEventListener("keydown", this.onEnterdown, false);
  }

  // Key event listeners
  onTabKey = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      this.setState({
        inputValue: this.state.autocomplete,
      });
      // if (this.state.isStudent) {
      //   this.submitHandler(e); // Submit on pressing enter
      // }
    }
  };

  onEnterdown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      this.submitLocation(e); // Submit on pressing enter
    }
  };

  inputFeedAutocomplete = (input) => {
    const suggestions = locations.default.filter(
      (location) =>
        input && location.toLowerCase().startsWith(input.toLowerCase())
    );

    this.setState({
      autocomplete: suggestions[0]
        ? input + suggestions[0].slice(input.length, suggestions[0].length)
        : "",
    });
    this.setState({
      autoLocations: suggestions.slice(0, 10),
    });
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

  clearInput = () => {
    this.setState({
      autocomplete: "",
      inputValue: "",
      autoLocations: [],
    });
  };

  submitLocation = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    this.props.fetchTideData(event.target.value);
    // Check that it is not empty
  };

  submitSuggestion = (location) => {
    console.log(location);
    this.props.fetchTideData(location);
    // Check that it is not empty
  };

  render() {
    console.log(this.state.autoLocations);
    let searchBar = (
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
        {this.state.autoLocations.length !== 0 ? (
          <div className={classes.SuggestionsContainer}>
            {this.state.autoLocations.map((location, index) => {
              if (index > 6) {
                return;
              }
              if (index === this.state.autoLocations.length - 1) {
                return (
                  <span
                    style={{ borderRadius: "0px 0px 20px 20px" }}
                    className={classes.SuggestionSpan}
                    onClick={() => this.submitSuggestion(location)}
                  >
                    {location}
                  </span>
                );
              }
              return (
                <span
                  className={classes.SuggestionSpan}
                  onClick={() => this.submitSuggestion(location)}
                >
                  {location}
                </span>
              );
            })}
          </div>
        ) : null}
        {this.state.inputValue.length === 0 ? (
          <img
            alt="Magnifying glass icon"
            src={searchIcon}
            className={classes.SearchIcon}
          />
        ) : (
          <img
            alt="Cross Icon"
            src={crossIcon}
            className={classes.CrossIcon}
            onClick={this.clearInput}
          />
        )}
      </div>
    );
    if (this.props.loading) {
      searchBar = <Spinner />;
    }
    return (
      <div className={classes.LocationSearch}>
        <img className={classes.Logo} src={tidelyLogo} alt="Tidely Logo" />
        <div className={classes.SearchContainer}>
          <div className={classes.SearchPrompt}>
            What's the <strong>tide</strong> like at the...
          </div>
          {searchBar}
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
