import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";

import classes from "./homeUserInfo.module.css";

const HomeUserInfo = (props) => {
  useEffect(() => {
    props.onFetchMyPostCount();
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <div className={classes.coverImage}>
          <img
            src={props.userData.profileImage}
            alt="ProfileImage"
            className={classes.profileImage}
          />
        </div>
        <div className={classes.profileInfo}>
          <p className={classes.heading}>
            {props.userData.firstname} {props.userData.lastname}
          </p>
          <p className={classes.subHeading}>{props.userData.desig?props.userData.desig + " at TTN":"Goal : Please update profile"} </p>
        </div>
        <div className={classes.lowerInfo}>
          <div className={classes.lowerInfoContent}>
            <p className={classes.count}>{props.friendsCount}</p>
            <p className={classes.lowerSubInfo}>Connections</p>
          </div>
          <hr style={{border:"1px solid #808080",height:"50px"}} />
          <div className={classes.lowerInfoContent}>
            <p className={classes.count}>{props.postCount}</p>
            <p className={classes.lowerSubInfo}>Posts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userReducer.userPersonalInfo,
    friendsCount: state.friendReducer.friendCount,
    postCount: state.postReducer.myPostCount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMyPostCount: () => dispatch(actionTypes.fetchMyPostCountData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeUserInfo);
