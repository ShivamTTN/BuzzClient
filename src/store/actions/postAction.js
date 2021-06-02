import * as actionTypes from "./actionTypes";
import axios from "axios";
import Cookies from "js-cookie";
import M from "materialize-css";

export const fetchPostStart = () => {
  return {
    type: actionTypes.FETCH_POST_START,
  };
};

export const fetchPostFail = () => {
  return {
    type: actionTypes.FETCH_POST_FAIL,
  };
};

export const fetchAllPostSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ALLPOST_SUCCESS,
    postData: data,
  };
};
// ssssssssssssssssssssssssssssssssssssss
export const fetchAllPostSuccessWithChecked = (data, checked) => {
  return {
    type: actionTypes.FETCH_ALLPOST_SUCCESS_WITH_CHECKED,
    postData: data,
    checkboxChecked: checked,
  };
};



export const clearPostDataFromStore = () => {
  return {
    type: actionTypes.CLEAR_POST_DATA,
  };
};

export const fetchMyPostCountSuccess = (data) => {
  return {
    type: actionTypes.FETCH_MY_POST_COUNT_SUCCESS,
    myPostCount: data,
  };
};

export const MakeLikeSuccess = () => {
  return {
    type: actionTypes.MAKE_LIKE_SUCCESS,
  };
};
export const MakeDislikeSuccess = () => {
  return {
    type: actionTypes.MAKE_DISLIKE_SUCCESS,
  };
};
export const setPostDataLength = () => {
  return {
    type: actionTypes.SET_POSTDATA_LENGTH_TO_ZERO,
  };
};

export const setCheckboxChecked = (checked) => {
  return {
    type: actionTypes.SET_CHECKBOX_CHECKED,
    checkboxChecked: checked,
  };
};



export const fetchAllPostDataForDelete = () => {
  return (dispatch) => {
    dispatch(fetchPostStart());
    // console.log(Cookies.get("token"))
    axios
      .get("/getReportedPosts", {
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        dispatch(fetchAllPostSuccess(res.data));
      })
      .catch((err) => {
        M.toast({
          html: "Error Fetching Post",
          classes: "rounded red accent-4",
        });
        dispatch(fetchPostFail(err));
      });
  };
};

export const fetchAllPostDataForCreate = () => {
  return (dispatch) => {
    dispatch(fetchPostStart());
    // console.log(Cookies.get("token"))
    axios
      .get("/getPosts", {
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        dispatch(fetchAllPostSuccess(res.data));
      })
      .catch((err) => {
        M.toast({
          html: "Error Fetching Post",
          classes: "rounded red accent-4",
        });
        dispatch(fetchPostFail(err));
      });
  };
};

// export const fetchAllPostData = (checked,skip,limit) =>{

// }

export const fetchAllPostData = (checked, skip, limit) => {
  if (checked) {
    console.log("in checked");
    return (dispatch) => {
      console.log(skip, limit);
      // dispatch(fetchPostStart());
      // console.log(Cookies.get("token"))
      if (skip === 0) {
        dispatch(clearPostDataFromStore());
      }
      axios
        .get("/getReportedPosts", {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
          params: {
            skip: skip,
            limit: limit,
          },
        })
        .then((res) => {
          if(res.data.length>0)
          {
            dispatch(fetchAllPostSuccessWithChecked(res.data, checked));
          }
          else{
            dispatch(setCheckboxChecked(checked))
            dispatch(setPostDataLength())
          }
          
        })
        .catch((err) => {
          console.log(err)
          M.toast({
            html: "Error Fetching Post",
            classes: "rounded red accent-4",
          });
          dispatch(fetchPostFail(err));
        });
    };
  } else {
    return (dispatch) => {
      console.log("in without checked");
      // dispatch(fetchPostStart());
      if (skip === 0) {
        dispatch(clearPostDataFromStore());
      }
      console.log(skip, limit);
      // console.log(Cookies.get("token"))
      axios
        .get("/getPosts", {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
          params: {
            skip: skip,
            limit: limit,
          },
        })
        .then((res) => {
          console.log(res.data);
          if(res.data.length>0)
          {
            dispatch(fetchAllPostSuccessWithChecked(res.data, checked));
          }
          else
          {
            dispatch(setCheckboxChecked(checked))
            dispatch(setPostDataLength())
          }
          
          
        })
        .catch((err) => {
          M.toast({
            html: "Error Fetching Post",
            classes: "rounded red accent-4",
          });
          console.log(err);
          dispatch(fetchPostFail(err));
        });
    };
  }
};

export const fetchAllPostDataWithoutSpinner = (checked,skip,limit) => {
  return (dispatch) => {
    // dispatch(fetchPostStart());
    // console.log(Cookies.get("token"))
    axios
      .get("/getPosts", {
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("token"),
        },
        params: {
          skip: skip,
          limit: limit,
        },
      })
      .then((res) => {
        // console.log(res.data);
        dispatch(fetchAllPostSuccess(res.data));
      })
      .catch((err) => {
        M.toast({
          html: "Error Fetching Post",
          classes: "rounded red accent-4",
        });
        // dispatch(fetchPostFail(err));
      });
  };
};

export const fetchMyPostCountData = () => {
  return (dispatch) => {
    dispatch(fetchPostStart());
    // console.log(Cookies.get("token"))
    axios
      .get("/getMyPostCount", {
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("token"),
        },
      })
      .then((res) => {
        // console.log(res.data)
        dispatch(fetchMyPostCountSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchPostFail(err));
        M.toast({
          html: "Error Fetching Post Count",
          classes: "rounded red accent-4",
        });
      });
  };
};

export const postLikeClicked = (postId,checked,skip,limit) => {
  return (dispatch) => {
    
    axios
      .post(
        "/createLike",
        {
          postId: postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        // dispatch(clearPostDataFromStore());
        M.toast({
          html: "Post Liked <i class='fas fa-heart'></i>",
          classes: "rounded light-green accent-4",
        });
        dispatch(fetchAllPostDataWithoutSpinner(checked,0,skip+limit));

      })
      .catch((err) => {
        dispatch(fetchPostFail(err));
        M.toast({ html: "Error Liking Post", classes: "rounded red accent-4" });
      });
  };
};

export const postDisikeClicked = (postId,checked,skip,limit) => {
  return (dispatch) => {
    axios
      .post(
        "/createDislike",
        {
          postId: postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        // dispatch(clearPostDataFromStore());
        M.toast({
          html: "Post Disliked <i class='fas fa-heart-broken'></i>",
          classes: "rounded red accent-4",
        });
        dispatch(fetchAllPostDataWithoutSpinner(checked,0,skip+limit));

      })
      .catch((err) => {
        M.toast({
          html: "Error Disliking Post",
          classes: "rounded red accent-4",
        });
        dispatch(fetchPostFail(err));
      });
  };
};

export const postCommentSubmit = (event, postId, comment,checked,skip,limit) => {
  event.preventDefault();
  event.target.value = "";
  return (dispatch) => {
    axios
      .post(
        "/createComment",
        {
          postId: postId,
          comment: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        M.toast({
          html: "Post Commented <i class='fas fa-comments'></i>",
          classes: "rounded light-green accent-4",
        });
        // dispatch(clearPostDataFromStore());
        dispatch(fetchAllPostDataWithoutSpinner(checked,0,skip+limit));
      })
      .catch((err) => {
        M.toast({
          html: "Error Commenting Post",
          classes: "rounded red accent-4",
        });
        dispatch(fetchPostFail(err));
      });
  };
};

export const createPost = (caption, url) => {
  return (dispatch) => {
    // console.log("Here")
    // dispatch(fetchPostStart());
    axios
      .post(
        "/createPost",
        {
          caption: caption,
          images: url,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        M.toast({
          html: "Post Created Successfully",
          classes: "rounded light-green accent-4",
        });
        dispatch(fetchAllPostData(false,0,2));
        dispatch(fetchMyPostCountData());
      })
      .catch((err) => {
        M.toast({
          html: "Error Creating Post",
          classes: "rounded red accent-4",
        });
        dispatch(fetchPostFail(err));
      });
  };
};

export const reportPost = (postId,checked,skip,limit) => {
  return (dispatch) => {
    axios
      .post(
        "/createReport",
        {
          postId: postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
        }
      )
      .then((res) => {
       
        M.toast({
          html: "Post Reported Successfully",
          classes: "rounded light-green accent-4",
        });
        dispatch(fetchAllPostDataWithoutSpinner(checked,0,skip+limit));
      })
      .catch((err) => {
        M.toast({
          html: "Error Reporting Post",
          classes: "rounded red accent-4",
        });
        dispatch(fetchPostFail(err));
      });
  };
};

export const deletePost = (postId, checked,skip,limit) => {
  return (dispatch) => {
    axios
      .post(
        "/deletePost",
        {
          postId: postId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
        }
      )
      .then((res) => {

        M.toast({
          html: "Deleted Post Successfully",
          classes: "rounded light-green accent-4",
        });
        dispatch(clearPostDataFromStore());
        dispatch(fetchAllPostData(checked,0,skip+limit));
        dispatch(fetchMyPostCountData());
      })
      .catch((err) => {
        M.toast({
          html: "Error Deleting Post",
          classes: "rounded red accent-4",
        });
        dispatch(fetchPostFail(err));
      });
  };
};
