import { Datacenter, datadogRum } from "@datadog/browser-rum";

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import tideDataReducer from "./store/reducers/tideData";

datadogRum.init({
  applicationId: "934406e1-226a-4bff-b080-f212fcfba2ba",
  clientToken: "pub861c78c8f54332c2c169c4fbc533cef5",
  datacenter: Datacenter.US,
  sampleRate: 100,
  trackInteractions: true,
});

document.title = "Tidely";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  tideData: tideDataReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
