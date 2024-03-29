import React from "react";
import {connect} from "react-redux"
import classes from "./adminPanel.module.css";
const adminPanel = (props) => {
  // console.log(props.checkboxChecked)
  let display = null;
  
    display = (
      <div className={classes.container}>
        <label className={classes.switch}>
          <input type="checkbox" className="browser-default" checked={props.checkboxChecked} onChange={props.checked} />
          <span className={classes.slider + " " + classes.round}>
            <span className={classes.text}>Review flagged post</span>
          </span>
        </label>
      </div>
    );
  
  return display;
};

const mapStateToProps = (state)=>{
  return{
    checkboxChecked : state.postReducer.checkboxChecked
  }
}
export default connect(mapStateToProps)(adminPanel);
