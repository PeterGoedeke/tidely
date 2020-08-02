import React from "react";
import classes from "./InfoCard.module.css";

import boatIcon from "../../assets/icons/boatIcon.png";
import personIcon from "../../assets/icons/personIcon.png";
import weatherIcon from "../../assets/icons/weatherIcon.png";
import windIcon from "../../assets/icons/windIcon.png";

const InfoCard = (props) => {

    /* PROPS TO PASS IN:
        isBoat (boolean - is this info for walking or for boating)
        wind (string of what the wind is like)
        rain (string of what the rain is like)
    */


    return (
        <div className={classes.InfoCardContainer}>
            <img
                src={props.isBoat ? boatIcon : personIcon}
                className={classes.Icon}
            />
            <div className={classes.TimeRange}>
                {/* <p className={classes.Time}><strong>{props.startTime}</strong></p> */}
                <p className={classes.Time}><strong>20PM</strong></p>
                <p>to</p>
                {/* <p className={classes.Time}><strong>{props.finishTime}</strong></p> */}
                <p className={classes.Time}><strong>20PM</strong></p>
            </div>

            <div className={classes.InfoContainer}>
                <p className={classes.WindInfo}>
                    <img className={classes.WeatherIcons} src={weatherIcon} />
                    {props.wind}
                </p>
                <div className={classes.Line}></div>
                <p className={classes.RainInfo}>
                    <img className={classes.WeatherIcons} src={windIcon} />
                    {props.rain}</p>
                {/* <p className={classes.WindInfo}>
                    <img className={classes.WeatherIcons} src={weatherIcon} />
                    wind is 389203kmph  </p> */}
                {/* <div className={classes.Line}></div> */}
                {/* <p className={classes.RainInfo}>
                    <img className={classes.WeatherIcons} src={windIcon} />
                    rain is 42910421ml something
                </p> */}
            </div>

        </div>
    )
};

export default InfoCard;