import { updateObject } from "./utility";
import * as actiontypes from "../actions/actionTypes";

const initialState = {
  friends: [],
  received: [],
  suggesstedFriend: [],
  friendCount: 0,
  receivedCount: 0,
  loading: false,
  error: false,
};

const setFriendData = (state, action) => {
  // console.log(action.friendData);
  return updateObject(state, {
    friends: action.friendData,
    loading: false,
    friendCount: action.friendData.length,
  });
};
const setPendingData = (state, action) => { //Actuall Received
  // console.log(action.friendData);
  return updateObject(state, {
    received: action.receivedData,
    loading: false,
    receivedCount: action.receivedData.length,
  });
};

const suggesstedFriendData = (state, action) => {
  return updateObject(state, {
    suggesstedFriend: action.suggesstedFriendData,
    loading: false,
  });
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.FETCH_FRIENDS_START:
      return updateObject(state, { loading: true });
    case actiontypes.FETCH_FRIENDS_FAIL:
      return updateObject(state, { loading: false });
    case actiontypes.FETCH_FRIENDS_SUCCESS:
      return setFriendData(state, action);
    case actiontypes.FETCH_PENDING_SUCCESS:
      return setPendingData(state, action);
    case actiontypes.FETCH_SUGGESSTED_FRIEND_SUCCESS:
      return suggesstedFriendData(state, action);
    default:
      return state;
  }
};

export default friendReducer;
