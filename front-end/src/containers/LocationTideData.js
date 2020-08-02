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
              <input value="Enter a Beach location..." />
              <img src={searchIcon} className={classes.SearchIcon} />
            </div>
          ) : (
            <img
              src={crossIcon}
              className={classes.crossIcon}
              onClick={this.closeSearchOverlay}
            />
          )}
          {/* <SearchBar /> */}
        </div>
        <div className={classes.WeatherInfo}>weather info</div>
        <div className={classes.TideInfo}>tide indfo</div>
      </div>
    );
  }
}

export default LocationTideData;
