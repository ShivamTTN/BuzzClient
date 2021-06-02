import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  loading: false,
  error: false,
  myPostCount: 0,
  checkboxChecked: false,
  postDataLength: 0,
};

const allPostSuccess = (state, action) => {
  // console.log(action.postData)
  return updateObject(state, {
    posts: action.postData,
    loading: false,
  });
};

const allPostSuccessWithChecked = (state, action) => {
  // console.log(action.postData)
  return {
    ...state,
    posts: state.posts.concat(action.postData),
    loading: false,
    checkboxChecked: action.checkboxChecked,
    postDataLength: action.postData.length,
  };
};

const myPostCountSuccess = (state, action) => {
  return updateObject(state, {
    myPostCount: action.myPostCount,
    loading: false,
  });
};

const clearPostData = (state, action) => {
  return updateObject(state, {
    posts: [],
    postDataLength: 0,
  });
};

const setPostDataLengthZero = (state, action) => {
  return updateObject(state, {
    postDataLength: 0,
  });
};
const setCheckboxChecked = (state, action) => {
  return updateObject(state, {
    checkboxChecked: action.checkboxChecked,
  });
};


const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POST_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_POST_FAIL:
      return updateObject(state, { loading: false });
    case actionTypes.FETCH_ALLPOST_SUCCESS:
      return allPostSuccess(state, action);
    case actionTypes.FETCH_ALLPOST_SUCCESS_WITH_CHECKED:
      return allPostSuccessWithChecked(state, action);
    case actionTypes.FETCH_MY_POST_COUNT_SUCCESS:
      return myPostCountSuccess(state, action);
    case actionTypes.CLEAR_POST_DATA:
      return clearPostData(state);
    case actionTypes.SET_POSTDATA_LENGTH_TO_ZERO:
      return setPostDataLengthZero(state);
    case actionTypes.SET_CHECKBOX_CHECKED:
      return setCheckboxChecked(state,action);
    default:
      return state;
  }
};

export default postReducer;
