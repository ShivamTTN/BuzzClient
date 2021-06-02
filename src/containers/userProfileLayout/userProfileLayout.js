import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header/header";
import FriendList from "../../components/FriendList/friendList";
import PesonalProfileCard from "../../components/PersonalProfileCard/personalProfileCard";
import checkToken from "../../hoc/checkToken";
import * as actionTypes from "../../store/actions/index"

import classes from "./userProfileLayout.module.css";

const UserProfileLayout = (props) => {
  useEffect(() => {
    props.onFetchUserData();
    props.onFetchFriendData();
    props.onFetchSuggesstedFriendData();
  }, []);
  return (
    <React.Fragment>
      <div className={classes.container}>
        <Header />
        <div className={classes.subContainer}>
          <div className={classes.leftContent}>
            <PesonalProfileCard />
          </div>
          <div className={classes.rightContent}>
            <FriendList heading="Suggestions" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserData: () => dispatch(actionTypes.fetchUserData()),
    onFetchFriendData: () => dispatch(actionTypes.fetchFriendData()),
    onFetchSuggesstedFriendData:()=> dispatch(actionTypes.fetchSuggesstedFriendData()),    
  };
};

export default connect(null,mapDispatchToProps)(checkToken(UserProfileLayout));
