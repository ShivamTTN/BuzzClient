import * as actionTypes from "./actionTypes";
import axios from "axios";
import Cookies from "js-cookie";
import M from "materialize-css";
import * as actionTypesForPost from "../actions/index"

export const fetchFriendStart = () => {
  return {
    type: actionTypes.FETCH_FRIENDS_START,
  };
};

export const fetchFriendFail = () => {
  return {
    type: actionTypes.FETCH_FRIENDS_FAIL,
  };
};

export const fetchFriendSuccess = (friendData) => {
  return {
    type: actionTypes.FETCH_FRIENDS_SUCCESS,
    friendData: friendData,
  };
};

export const fetchSuggesstedFriendSuccess = (SuggesstedData) => {
  return {
    type: actionTypes.FETCH_SUGGESSTED_FRIEND_SUCCESS,
    suggesstedFriendData: SuggesstedData,
  };
};

export const fetchPendingSuccess = (receivedData) => {
  return {
    type: actionTypes.FETCH_PENDING_SUCCESS,
    receivedData: receivedData,
  };
};

export const fetchFriendData = () => {
  return (dispatch) => {
    dispatch(fetchFriendStart());
    axios
      .get("https://young-sea-76906.herokuapp.com/getConnectedFriends", {
        headers: {
          authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        dispatch(fetchFriendSuccess(res.data.friends));
      })
      .catch((err) => {
        dispatch(fetchFriendFail(err));
      });
    dispatch(fetchFriendStart());
    axios
      .get("https://young-sea-76906.herokuapp.com/getReceivedFriendCount", {
        headers: {
          authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        dispatch(fetchPendingSuccess(res.data.received));
      })
      .catch((err) => {
        M.toast({html:"Error Fetching Friends",classes:'rounded red accent-4'})
        dispatch(fetchFriendFail(err));
      });
  };
};

export const fetchFriendDataWithoutSpinner = () => {
  return (dispatch) => {
    axios
      .get("https://young-sea-76906.herokuapp.com/getConnectedFriends", {
        headers: {
          authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        dispatch(fetchFriendSuccess(res.data.friends));
      })
      .catch((err) => {
        dispatch(fetchFriendFail(err));
      });
    axios
      .get("https://young-sea-76906.herokuapp.com/getReceivedFriendCount", {
        headers: {
          authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        dispatch(fetchPendingSuccess(res.data.received));
      })
      .catch((err) => {
        M.toast({html:"Error Fetching Friends",classes:'rounded red accent-4'})
        dispatch(fetchFriendFail(err));
      });
  };
};

export const fetchSuggesstedFriendData = () => {
  return (dispatch) => {
    dispatch(fetchFriendStart());
    axios
      .get("https://young-sea-76906.herokuapp.com/getSuggesstions", {
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        // console.log(res.data)
        dispatch(fetchSuggesstedFriendSuccess(res.data));
      })
      .catch((err) => {
        // console.log(err);
        M.toast({html:"Error Fetching Friends",classes:'rounded red accent-4'})
        dispatch(fetchFriendFail(err));
      });
  };
};

export const fetchSuggesstedFriendDataWithoutSpinner = () => {
  return (dispatch) => {
    axios
      .get("https://young-sea-76906.herokuapp.com/getSuggesstions", {
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        // console.log(res.data)
        dispatch(fetchSuggesstedFriendSuccess(res.data));
      })
      .catch((err) => {
        // console.log(err);
        M.toast({html:"Error Fetching Friends",classes:'rounded red accent-4'})
        dispatch(fetchFriendFail(err));
      });
  };
};

export const onAddFriendHandler = (friendId) => {
  // console.log("hahahah")
  return (dispatch) => {
    axios
      .post(
        "https://young-sea-76906.herokuapp.com/addFriend",
        { friendId: friendId },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        M.toast({
          html: "Friend Request Sent",
          classes: "rounded light-green accent-4",
        });
        dispatch(fetchFriendDataWithoutSpinner());
        dispatch(fetchSuggesstedFriendDataWithoutSpinner());
      })
      .catch((err) => {
        M.toast({html:"Error Adding Friends",classes:'rounded red accent-4'})
        dispatch(fetchFriendFail(err));
      });
  };
};
export const onConfirmFriendHandler = (friendId) => {
  // console.log("hahahah")
  return (dispatch) => {
    axios
      .post(
        "https://young-sea-76906.herokuapp.com/confirmFriend",
        { friendId: friendId },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        M.toast({
          html: "Friend Added",
          classes: "rounded light-green accent-4",
        });
        dispatch(fetchFriendDataWithoutSpinner());
        dispatch(fetchSuggesstedFriendDataWithoutSpinner());
        dispatch(actionTypesForPost.fetchAllPostData(false,0,2));
      })
      .catch((err) => {
        M.toast({html:"Error Confirming Friends",classes:'rounded red accent-4'})
        dispatch(fetchFriendFail(err));
      });
  };
};
export const onRejectFriendHandler = (friendId) => {
  // console.log("hahahah")
  return (dispatch) => {
    axios
      .post(
        "https://young-sea-76906.herokuapp.com/rejectFriend",
        { friendId: friendId },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        M.toast({
          html: "Friend Request Rejected",
          classes: "rounded light-orange accent-4",
        });
        dispatch(fetchFriendDataWithoutSpinner());
        dispatch(fetchSuggesstedFriendDataWithoutSpinner());
      })
      .catch((err) => {
        M.toast({html:"Error Rejecting Friends",classes:'rounded red accent-4'})
        dispatch(fetchFriendFail(err));
      });
  };
};

