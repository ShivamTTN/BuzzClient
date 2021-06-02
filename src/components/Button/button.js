import React from "react";
// import { Link } from "react-router-dom";
import "./button.css";
const button = (props) => {


  let tempButton = null;
  if (props.type === "fevi") {
    tempButton = (
      <button className={props.buttonClass} onClick={props.clicked} onChange={props.changed} disabled={props.disabled} >
        <i className={props.feviClass}></i> {props.text}
      </button>
    );
  } else if (props.type === "normal") {
    tempButton = (
      
      <button
        to={props.redirect}
        className={props.buttonClass}
        onClick={props.clicked} onChange={props.changed}
      >
        {props.text}
      </button>
    );
  }

  return tempButton;
};

export default button;
