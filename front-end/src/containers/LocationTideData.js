import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import * as actions from "../store/actions/index";
import classes from "./LocationTideData.module.css";

import * as locations from "../assets/beaches/beaches.json";

import tidelyLogo from "../assets/icons/logo.png";

import searchIcon from "../assets/icons/search-2.png";

class LocationTideData extends Component{
    state = {}

    render(){
        return(
            <div className={classes.LocationTideData}>
                <div className={classes.TopBar}>
                    logo + search bar
                </div>
                <div className={classes.WeatherInfo}>
                    weather info
                    </div>
                <div className={classes.TideInfo}>
                    tide indfo
                </div>
            </div>
        )
    }

}

export default LocationTideData;