import React from "react";

import classes from "./Spinner.module.css";

const spinner = () => {
  let spinnerColor = classes.LoaderWhite;

  return <div className={spinnerColor}>Loading...</div>;
};
export default spinner;
