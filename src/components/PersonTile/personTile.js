import React from "react";

import { connect } from "react-redux";

import classes from "./personTile.module.css";
import Button from "../Button/button";
import * as actionTypes from "../../store/actions/index";

const personTile = (props) => {
  let tile = null;
  if (props.addFriendButton) {
    tile = (
      <div className={classes.subContainer2}>
        <div className={classes.subContainer2Inner}>
          <img
            src={props.personImage}
            className={classes.personImage}
            alt="PersonImage"
          />
          <label onClick={props.clicked} className={classes.personTileLabel} style={{ cursor: "pointer" }}>
            {props.personName}
          </label>
        </div>

        <Button
          type="fevi"
          buttonClass="addFriend"
          feviClass="fas fa-plus"
          text="Friend"
          clicked={() => props.onAddFriendClickHandler(props.personId)}
        />
      </div>
    );
  } else if (props.receivedFriendList) {
    tile = (
      <div className={classes.subContainer2}>
        <div className={classes.subContainer2Inner}>
          <img
            src={props.personImage}
            className={classes.personImage}
            alt="PersonImage"
          />
          <label onClick={props.clicked} className={classes.personTileLabel} style={{ cursor: "pointer" }}>
            {props.personName}
          </label>
        </div>
        <div>
          <Button
            type="fevi"
            buttonClass="addFriend"
            feviClass="fas fa-check"
            clicked={() => props.confirm(props.personId)}
          />
          <Button
            type="fevi"
            buttonClass="addFriend"
            feviClass="fas fa-times"
            clicked={() => props.onRejectFriendClickHandler(props.personId)}
          />
        </div>
      </div>
    );
  } else {
    tile = (
      <div className={classes.subContainer1}>
        <img
          src={props.personImage}
          className={classes.personImage}
          alt="PersonImage"
        />
        <label onClick={props.clicked} className={classes.personTileLabel} style={{ cursor: "pointer" }}>{props.personName}</label>
      </div>
    );
  }
  return tile;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddFriendClickHandler: (id) =>
      dispatch(actionTypes.onAddFriendHandler(id)),
    onConfirmFriendClickHandler: (id) =>
      {
        dispatch(actionTypes.onConfirmFriendHandler(id))
      },
      
    onRejectFriendClickHandler: (id) =>
      dispatch(actionTypes.onRejectFriendHandler(id)),
  };
};

export default connect(null, mapDispatchToProps)(personTile);
