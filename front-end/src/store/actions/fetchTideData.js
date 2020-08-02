import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchTideDataStart = () => {
  return {
    type: actionTypes.FETCH_TIDE_DATA_START,
  };
};

export const fetchTideDataFail = (error) => {
  return {
    type: actionTypes.FETCH_TIDE_DATA_FAIL,
    error: error,
  };
};

export const fetchTideDataSuccess = (fetchedTideData) => {
  return {
    type: actionTypes.FETCH_TIDE_DATA_SUCCESS,
    fetchedTideData: fetchedTideData,
  };
};
export const fetchTideData = (inputLocation) => {
  return (dispatch) => {
    dispatch(fetchTideDataStart());

    axios
      .get("/" + inputLocation)
      .then((response) => {
        console.log(response.data);

        localStorage.setItem("tideData", JSON.stringify(response.data));
        dispatch(fetchTideDataSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchTideDataFail(err.response.data));
      });
  };
};
