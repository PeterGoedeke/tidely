import React, { Component } from "react";

import { connect } from "react-redux";

import classes from "./LocationTideData.module.css";

import tidelyLogo from "../assets/icons/logo.png";

import SearchBar from "../components/SearchBar/SearchBar";

import searchIcon from "../assets/icons/search-2.png";
import crossIcon from "../assets/icons/cross.png";
import InfoCard from "../components/InfoCard/InfoCard";

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

  toggleLowWind = () => {
    //toggle state and local storage

    this.setState({
      lowWind: !this.state.lowWind,
    });
  };

  toggleHighWind = () => {
    this.setState({
      highWind: !this.state.highWind,
    });
  };

  toggleLowTide = () => {
    this.setState({
      lowTide: !this.state.lowTide,
    });
  };

  toggleMidTide = () => {
    this.setState({
      midTide: !this.state.midTide,
    });
  };

  toggleHighTide = () => {
    this.setState({
      highTide: !this.state.highTide,
    });
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

  getWalkingTimes = (weatherInfo) => {
    const low = weatherInfo.tide.nextPeaks.low.time;
    const high = weatherInfo.tide.nextPeaks.high.time;

    const startTime = this.timeStringToNumber(low);
    const start =
      Math.round(
        (startTime[0] - 12 / 3 + (startTime[1] - 25 / 3) / 100) * 100
      ) / 100;

    const endTime = this.timeStringToNumber(high);
    const end =
      Math.round((endTime[0] + 12 / 3 + (endTime[1] + 25 / 3) / 100) * 100) /
      100;

    return { start, end };
  };

  getBoatingTimes = (weatherInfo) => {
    const low = weatherInfo.tide.nextPeaks.low.time;
    const high = weatherInfo.tide.nextPeaks.high.time;

    const startTime = this.timeStringToNumber(high);
    const start =
      Math.round(
        (startTime[0] - 12 / 3 + (startTime[1] - 25 / 3) / 100) * 100
      ) / 100;

    const endTime = this.timeStringToNumber(low);
    const end =
      Math.round((endTime[0] + 12 / 3 + (endTime[1] + 25 / 3) / 100) * 100) /
      100;

    return { start, end };
  };

  timeStringToNumber = (x) => {
    return x
      .slice(-9, -4)
      .split(":")
      .map((y) => Number(y));
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
    console.log(this.props.tideData);

    // const walking = this.getWalkingTimes(this.props.tideData);
    // let startW = walking.start;
    // let endW = walking.end;
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
          <h2>{this.props.tideData.placename}</h2>
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
        <div className={classes.TideInfo}>
          <InfoCard
            rain={this.props.tideData.env.weatherDescription}
            wind={
              "The wind speed is " + this.props.tideData.env.wind.speed + "m/s"
            }
            // startTime={startW}
            // endTime={endW}
          />
          <InfoCard
            rain={this.props.tideData.env.weatherDescription}
            wind={
              "The wind speed is " + this.props.tideData.env.wind.speed + "m/s"
            }
            isBoat={true}
          />
        </div>
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
