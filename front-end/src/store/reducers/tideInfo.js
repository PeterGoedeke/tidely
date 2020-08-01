import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility";

/*

This reducer is responsible for the event slice of the state 
which includes the companies that the student sees and can queue too

It contains information necessary to display the event name 
and display the event timer (when the event expires)


*/
const initialState = {
  tideData: {
    location: "",
    boatData: {
      startTime: [],
      endTime: [],
    },
    walkingData: {
      startTime: [],
      endTime: [],
    },
  },
  loading: false,
  error: null,
};

const fetchTideDataStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchTideDataSuccess = (state, action) => {
  // Format as follows
  // tideData: {
  //     location: "",
  //     boatData: {
  //       startTime: [],
  //       endTime: [],
  //     },
  //     walkingData: {
  //       startTime: [],
  //       endTime: [],
  //     },
  //   },

  return {
    ...state,
    companies: action.companies,
    loading: false,
  };
};

const fetchTideDataFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TIDE_DATA_START:
      return fetchTideDataStart(state, action);
    case actionTypes.FETCH_TIDE_DATA_SUCCESS:
      return fetchTideDataSuccess(state, action);
    case actionTypes.FETCH_TIDE_DATA_FAIL:
      return fetchTideDataFail(state, action);
    default:
      return state;
  }
};
export default reducer;
