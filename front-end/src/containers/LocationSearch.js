import React, { Component } from "react";
import classes from './LocationSearch.module.css';



class LocationSearch extends Component {
  state = {};

  componentDidMount() {
    //
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
export default LocationSearch;
