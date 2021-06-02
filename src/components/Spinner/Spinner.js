import React from "react";
import classes from "./Spinner.module.css";

const spinner = () => {
  return (
    <React.Fragment>
<div className={classes.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
    </React.Fragment>
  );
};

export default spinner;
