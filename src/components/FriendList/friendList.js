import React, { useState,useRef } from "react";
import { connect } from "react-redux";
//Components
import { Redirect, withRouter } from "react-router-dom";
import PersonTile from "../PersonTile/personTile";
import Button from "../Button/button";
import Spinner from "../Spinner/Spinner";

//Css Classes
import classes from "./friendList.module.css";

const FriendList = (props) => {
  let data = <Spinner />;
  // console.log(props);

  const [contactSearch, setContactSearch] = useState("");
  const [suggSearch, setSuggSearch] = useState("");

  const onPersonTileClickedHandler = (id) => {
    // console.log("nide")
    props.history.push("/profile/" + id);
  };

  let friendsPersonTiles = <p>No Contacts </p>;
  

  if (!props.loading) {
    //  console.log(friendsPersonTiles)
    // console.log(props.friendData)
    if (props.friendData.length > 0 && !contactSearch) {
      friendsPersonTiles = props.friendData.map((item) => {
        let name = item.firstname + " " + item.lastname;
        return (
          <PersonTile
            key={item._id}
            personId={item._id}
            personImage={item.profileImage}
            personName={name}
            clicked={() => {
              onPersonTileClickedHandler(item._id);
            }}
          />
        );
      });
    }
    else if(props.friendData.length > 0 && contactSearch)
    {
      let filteredFriendData = props.friendData.filter((item)=>{
        let name = item.firstname + " " + item.lastname;
        // console.log(name + " " + contactSearch)
        return name.includes(contactSearch)
      })
      // console.log(filteredFriendData)
      if(filteredFriendData.length > 0)
      {
        friendsPersonTiles = filteredFriendData.map((item) => {
       
          let name = item.firstname + " " + item.lastname;
          return (
            <PersonTile
              key={item._id}
              personId={item._id}
              personImage={item.profileImage}
              personName={name}
              clicked={() => {
                onPersonTileClickedHandler(item._id);
              }}
            />
          );
        });
      }
      else
      {
        friendsPersonTiles = <p>Not Found !! </p>
      }

    }

    let suggestedFriendPersonTiles = <p>No Suggesstions </p>;
    // console.log(props.friendData)
    if (props.suggesstedFriendData.length > 0 && !suggSearch) {
      suggestedFriendPersonTiles = props.suggesstedFriendData.map((item) => {
        let name = item.firstname + " " + item.lastname;

        return (
          <PersonTile
            key={item._id}
            personId={item._id}
            personImage={item.profileImage}
            personName={name}
            addFriendButton="true"
            clicked={() => {
              onPersonTileClickedHandler(item._id);
            }}
          />
        );
      });
    }
    else if(props.suggesstedFriendData.length > 0 && suggSearch)
    {
      let suggestedFriendData = props.suggesstedFriendData.filter((item)=>{
        let name = item.firstname + " " + item.lastname;
        // console.log(name + " " + contactSearch)
        return name.includes(suggSearch)
      })
      // console.log(filteredFriendData)
      if(suggestedFriendData.length > 0)
      {
        suggestedFriendPersonTiles = suggestedFriendData.map((item) => {
       
          let name = item.firstname + " " + item.lastname;
          return (
            <PersonTile
              key={item._id}
              personId={item._id}
              personImage={item.profileImage}
              personName={name}
              addFriendButton="true"
              clicked={() => {
                onPersonTileClickedHandler(item._id);
              }}
            />
          );
        });
      }
      else
      {
        suggestedFriendPersonTiles = <p>Not Found !! </p>
      }
    }
    let list = null;
    if (props.heading === "Contacts") {
      list = (
        <div className={classes.subContainer}>
          <div className={classes.topHeader}>
            <p>{props.heading}</p>
            <div className={classes.searchDropdown}>
              <Button
                type="fevi"
                feviClass="fas fa-search"
                buttonClass="searchButton"
              />
              <div className={classes.searchDropdownContent}>
                <input
                  type="text"
                  name="txtSearch"
                  className="browser-default"
                  value={contactSearch}
                  onChange={(event) =>setContactSearch(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={classes.persons}>{friendsPersonTiles}</div>
        </div>
      );
    } else if (props.heading === "Suggestions") {
      list = (
        <div className={classes.subContainer}>
          <div className={classes.topHeader}>
            <p>{props.heading}</p>
            <div className={classes.searchDropdown}>
              <Button
                type="fevi"
                feviClass="fas fa-search"
                buttonClass="searchButton"
              />
              <div className={classes.searchDropdownContent}>
                <input
                  type="text"
                  name="txtSearch"
                  className="browser-default"
                  value={suggSearch}
                  onChange={(event) => setSuggSearch(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={classes.persons}>{suggestedFriendPersonTiles}</div>
        </div>
      );
    }
    data = <div className={classes.container}>{list}</div>;
  }

  return data;

  // let list = null;
  // if (props.heading === "Contacts") {
  //   list = (
  //     <div className={classes.subContainer}>
  //       <div className={classes.topHeader}>
  //         <p>{props.heading}</p>
  //         <Button
  //           type="fevi"
  //           feviClass="fas fa-search"
  //           buttonClass="searchButton"
  //         />
  //       </div>

  //       <div className={classes.persons}>{personTiles}</div>
  //     </div>
  //   );
  // } else if (props.heading === "Suggestions") {
  //   list = (
  //     <div className={classes.subContainer}>
  //       <div className={classes.topHeader}>
  //         <p>{props.heading}</p>
  //         <Button
  //           type="fevi"
  //           feviClass="fas fa-search"
  //           buttonClass="searchButton"
  //         />
  //       </div>
  //       <div className={classes.persons}>
  //         <PersonTile addFriendButton="true" />
  //         <PersonTile addFriendButton="true" />
  //         <PersonTile addFriendButton="true" />
  //         <PersonTile addFriendButton="true" />
  //       </div>
  //     </div>
  //   );
  // }
  // return <div className={classes.container}>{list}</div>;
};
const mapStateToProps = (state) => {
  return {
    friendData: state.friendReducer.friends,
    loading: state.friendReducer.loading,
    suggesstedFriendData: state.friendReducer.suggesstedFriend,
  };
};

export default connect(mapStateToProps, null)(withRouter(FriendList));
