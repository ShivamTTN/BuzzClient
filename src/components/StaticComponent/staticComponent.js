import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";

import classes from "./staticComponent.module.css";

const staticComponent = (props) => {

  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>

        <div className={classes.profileInfo}>
          <p className={classes.heading}>
            Recent
          </p>
          <p className={classes.subHeading}><i className="fab fa-slack-hash"></i> Javascript</p>
          <p className={classes.subHeading}><i className="fab fa-slack-hash"></i> MongoDB</p>
          <p className={classes.subHeading}><i className="fab fa-slack-hash"></i> SQL</p>
        </div>

        <div className={classes.profileInfo}>
          <p className={classes.heading}>
            Groups
          </p>
          <p className={classes.subHeading}><i className="fas fa-users"></i> NeedHelp?</p>
          <p className={classes.subHeading}><i className="fas fa-users"></i> FunFacts</p>
          <p className={classes.subHeading}><i className="fas fa-users"></i> Advance Problems</p>
        </div>
 
      </div>
    </div>
  );
};


export default staticComponent;
