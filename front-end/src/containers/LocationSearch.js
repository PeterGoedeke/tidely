import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import * as actions from "../store/actions/index";
import classes from "./LocationSearch.module.css";

import tidelyLogo from "../assets/icons/logo.png";
import lightWave from "../assets/background-images/lightwave.png";
import darkWave from "../assets/background-images/darkwave.png";

import SearchBar from "../components/SearchBar/SearchBar";
import bird1 from "../assets/icons/bird1.png";
import bird2 from "../assets/icons/bird2.png";
import bird3 from "../assets/icons/bird3.png";


const locationSearch = () => {
  return (
    <div className={classes.LocationSearch}>
      <img className={classes.Logo} src={tidelyLogo} alt="Tidely Logo" />
      <img className={classes.Bird1} src={bird1} alt="big minimalistic bird" />
      <img className={classes.Bird2} src={bird2} alt="medium minimalistic bird" />
      <img className={classes.Bird3} src={bird3} alt="small minimalistic bird" />

      <div className={classes.SearchContainer}>
        <div className={classes.SearchPrompt}>
          What's the <strong>tide</strong> like at the...
        </div>
        <SearchBar />
      </div>
      <img
        alt="Ocean Wave vector graphic"
        className={classes.LightWave}
        src={lightWave}
      />
      <img
        alt="Ocean Wave vector graphic"
        className={classes.DarkWave}
        src={darkWave}
      />
    </div>
  );
};

export default locationSearch;
