import React, { Component } from "react";

import { connect } from "react-redux";

import classes from "./LocationTideData.module.css";

import tidelyLogo from "../assets/icons/logo.png";

import SearchBar from "../components/SearchBar/SearchBar";

import searchIcon from "../assets/icons/search-2.png";
import crossIcon from "../assets/icons/cross.png";

class LocationTideData extends Component {
  state = {
    showSearchOverlay: false,
    lowWind: true,
    highWind: false,
    lowTide: true,
    midTide: false,
    highTide: false,
    title: "",
  };

  componentDidMount() {
    this.setState({
      title: this.props.tideData.placename,
    });
    const userConfig = JSON.parse(localStorage.getItem("userConfig"));

    console.log(userConfig);
  }
  toggleLowWind = () => {
    //toggle state and local storage

    this.setState({
      lowWind: !this.state.lowWind,
    });
    this.setLocalStorage();
  };

  toggleHighWind = () => {
    this.setState({
      highWind: !this.state.highWind,
    });
    this.setLocalStorage();
  };

  toggleLowTide = () => {
    this.setState({
      lowTide: !this.state.lowTide,
    });
    this.setLocalStorage();
  };

  toggleMidTide = () => {
    this.setState({
      midTide: !this.state.midTide,
    });
    this.setLocalStorage();
  };

  toggleHighTide = () => {
    this.setState({
      highTide: !this.state.highTide,
    });
    this.setLocalStorage();
  };

  setLocalStorage = () => {
    localStorage.setItem("userConfig", JSON.stringify(this.state));
  };

  showSearchOverlay = () => {
    this.setState({
      showSearchOverlay: true,
    });
  };

  closeSearchOverlay = () => {
    this.setState({
      showSearchOverlay: false,
    });
  };
  render() {
    let searchOverlay = (
      <div className={classes.SearchOverlay}>
        <SearchBar />
      </div>
    );
    if (!this.state.showSearchOverlay) {
      searchOverlay = null;
    }
    let active = {
      backgroundColor: "rgba(255, 255, 255, 1)",
      color: "#62b6cb",
    };
    return (
      <div className={classes.LocationTideData}>
        {searchOverlay}
        <div className={classes.TopBar}>
          <img src={tidelyLogo} className={classes.Logo} alt="Tidely Logo" />
          {!this.state.showSearchOverlay ? (
            <div
              className={classes.IconContainer}
              onClick={this.showSearchOverlay}
            >
              <input value="Enter a Beach location..." disabled readOnly />
              <img
                src={searchIcon}
                className={classes.SearchIcon}
                alt="search icon"
              />
            </div>
          ) : (
            <img
              src={crossIcon}
              className={classes.crossIcon}
              onClick={this.closeSearchOverlay}
              alt="cross icon"
            />
          )}
          {/* <SearchBar /> */}
        </div>
        <div className={classes.TitleContainer}>
          <h2>Mission Bay, Auckland</h2>
          <div className={classes.ButtonsContainer}>
            <div className={classes.WindButtonsContainer}>
              <button
                style={this.state.lowWind ? active : null}
                onClick={this.toggleLowWind}
              >
                Low wind
              </button>
              <button
                style={this.state.highWind ? active : null}
                onClick={this.toggleHighWind}
              >
                High wind
              </button>
            </div>
            <div className={classes.TideButtonsContainer}>
              <button
                style={this.state.lowTide ? active : null}
                onClick={this.toggleLowTide}
              >
                Low tide
              </button>
              <button
                style={this.state.midTide ? active : null}
                onClick={this.toggleMidTide}
              >
                Mid tide
              </button>
              <button
                style={this.state.highTide ? active : null}
                onClick={this.toggleHighTide}
              >
                High tide
              </button>
            </div>
          </div>
        </div>
        <div className={classes.TideInfo}>tide indfo</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.tideData.loading,
    error: state.tideData.error,
    tideData: state.tideData.tideData,
  };
};

export default connect(mapStateToProps)(LocationTideData);
