import React from "react";
import PersonTile from "../PersonTile/personTile";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "../Button/button";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import DarkLogo from "../../assets/Logo/darkLogo.png";
import Cookies from "js-cookie";
const header = (props) => {
  const onLogoutClickHandler = () => {
    Cookies.remove("token");
    props.history.replace("/");
  };

  let receivedPersonTile = <span> <i className="far fa-frown" style={{marginRight:"10px"}}></i> No friend request</span>;
  if (props.receivedFriends.length > 0) {
    receivedPersonTile = props.receivedFriends.map((item) => {
      return (
        <PersonTile
          key={item._id}
          personId={item._id}
          personImage={item.profileImage}
          personName={item.firstname + " " + item.lastname}
          receivedFriendList="true"
          confirm = {(id)=>props.onConfirm(id)}
        />
      );
    });
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.headerContainer}>
        <div>
          <img src={DarkLogo} className={classes.logoImage} alt="DarkLogo" onClick={()=>props.history.push("/home")} />
        </div>
        <div className={classes.headerRight}>
          <div className={classes.innerHeaderRight}>
            <div className={classes.dropdown}>
              <img
                src={props.userData.profileImage}
                className={classes.dropbtn}
                alt="PersonImage"
              />
              <div className={classes.dropdownContent}>
                <Link to="/myProfile">
                  <i className="fas fa-user"></i>
                  <span style={{ marginLeft: "5px" }}>My Profile</span>
                </Link>
                <Button
                  type="fevi"
                  feviClass="fas fa-sign-out-alt"
                  buttonClass="logoutButton"
                  text="Log out"
                  clicked={() => onLogoutClickHandler()}
                />
              </div>
              <label className={classes.headerLabel} style={{ fontSize: "1rem" }}>
                {props.userData.firstname} {props.userData.lastname}
              </label>
            </div>
          </div>
          {/* <div className={classes.addIconCircle}>
          <i className={"fas fa-user-plus " + classes.addIcon}></i>
        </div> */}
          <div className={classes.receivedDropdown}>
            <div className={classes.receivedDropdownContent}>
              {receivedPersonTile}
            </div>
            <div className={classes.notification}>
              <span className={"fas fa-user-plus " + classes.addIcon}></span>
              <span className={classes.badge}>{props.receivedCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userData: state.userReducer.userPersonalInfo,
    receivedCount: state.friendReducer.receivedCount,
    receivedFriends: state.friendReducer.received,
  };
};

export default connect(mapStateToProps, null)(withRouter(header));
