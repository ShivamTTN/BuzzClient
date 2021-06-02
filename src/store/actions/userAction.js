import * as actionTypes from "./actionTypes";
import axios from "axios";
import Cookies from "js-cookie";
import M from 'materialize-css'

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START,
  };
};
export const fetchUserFail = () => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
  };
};
export const fetchUserSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user: userData,
  };
};

export const fetchUserData = () => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    // console.log(Cookies.get("token"))
    axios
      .get("https://young-sea-76906.herokuapp.com/getUserData", {
        headers: {
          authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        // console.log(res.data)
        dispatch(fetchUserSuccess(res.data));
      })
      .catch((err) => {
        M.toast({html:"Error in Fetching User Info",classes:'rounded red accent-4'})
        
        // console.log(err)
        dispatch(fetchUserFail(err));
      });
  };
};

export const updateUserData = (userObj) => {
  return (dispatch) => {
    // console.log("Here")
    dispatch(fetchUserStart());
    axios
      .put(
        "https://young-sea-76906.herokuapp.com/updateUserData",
        {
         userObj:userObj
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        M.toast({html:"User Data Updated Successfully",classes:'rounded light-green accent-4'})
        dispatch(fetchUserData());
      })
      .catch((err) => {
        M.toast({html:"Error Updating User Info",classes:'rounded red accent-4'})
        dispatch(fetchUserFail(err));
      });
  };
};
