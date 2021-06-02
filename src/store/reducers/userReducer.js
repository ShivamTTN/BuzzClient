// import React from "react";
import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userPersonalInfo: {},
  error: false,
  loading: false,
 
};

const setUserData = (state, action) => {
  // console.log(action.user);
  return updateObject(state, {
    userPersonalInfo: action.user,
    loading: false,
  });
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_USER_SUCCESS:
      return setUserData(state, action);
    case actionTypes.FETCH_USER_FAIL:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};

export default userReducer;
