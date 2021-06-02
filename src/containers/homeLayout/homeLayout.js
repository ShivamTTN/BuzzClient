import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header/header";
import CheckToken from "../../hoc/checkToken";
// import PersonTile from "../../components/PersonTile/personTile";
import AddPost from "../../components/AddPost/addPost";
import HomeUserInfo from "../../components/HomeUserInfo/homeUserInfo";
import FriendList from "../../components/FriendList/friendList";
import Post from "../../components/Post/post";
import AdminPanel from "../../components/AdminPanel/adminPanel";
import Spinner from "../../components/Spinner/Spinner";
import StaticComponent from "../../components/StaticComponent/staticComponent"
import * as actionTypes from "../../store/actions/index";

import classes from "./homeLayout.module.css";


const HomeLayout = (props) => {


  const [skip,setSkip] = useState(0);
  const [limit,setLimit] = useState(2);
  const [postLoading,setPostLoading] = useState(false)
  // const [scrollY, setScrollY] = useState(0);
  // const [checkbox,setCheckbox] = useState(false)

  function logit() {

    // setScrollY();
    // console.log(window.pageYOffset);
    // console.log(props.postDataLength)
    if (window.pageYOffset + window.innerHeight ===   document.body.scrollHeight ){
      // console.log(props.posts.length)  
    
      
      if(props.postDataLength>0)
      {
        setPostLoading(true)
         setSkip(skip+2);
        //  console.log(skip)
        props.onFetchPostData(props.checkboxChecked,skip+2,limit)
        setPostLoading(false)
      }
      
  
      
    }
  }
 const watchScroll = () => {
    window.addEventListener("scroll", logit);
  }

useEffect(() => {

  watchScroll();

  return () => {
    window.removeEventListener("scroll", logit);
  };
},[props.postDataLength,skip]);

// useEffect(()=>{
//   // document.addEventListener('scroll', pageEnd);
//   window.addEventListener("scroll",pageEnd)
    


// },[]);

  useEffect(() => {

    props.onFetchUserData();
    props.onFetchFriendData();
    props.onFetchSuggesstedFriendData();
    props.onFetchPostData(false,skip,limit);
  }, []);

  // console.log(scrollHeight)
  // console.log(document.body.scrollTop)
  // console.log(window.innerHeight + scrollY)
  let page =<div style={{marginLeft:"50%",marginTop:"200px",width:"100vh"}}> <Spinner /></div>;

  if (!props.loadingUser) {
    let posts = <Spinner />
    if (!props.loadingPost) {
      if(props.posts.length>0)
      {
        posts =  props.posts.map((item) => {
          // console.log(item);
          return <Post {...item}  key={item._id} skip={skip} limit={limit} />
        });
      }
      else
      {
          posts = <p style={{color:"white"}}>Sry No Post Available</p>
      }

    }
  const onAdminCheckboxChangeHandler = ()=>{
   
    props.onCheckboxChangeHandler(!props.checkboxChecked,0,limit)
    setSkip(0)
  }

  const onAddPostClickHandler =(caption,urls)=>{
   
    props.onCreatePostClick(caption,urls)
    setSkip(0)
  }
  const onConfirmFriendHandler =(id)=>{
   
    props.onConfirmFriendClickHandler(id)
    setSkip(0)
  }


    page = (
      <React.Fragment>
        <Header onConfirm={(id)=>onConfirmFriendHandler(id)} />
        <div className={classes.container}>
          <div className={classes.leftSide}>
            <HomeUserInfo />
            <StaticComponent />
          </div>
          <div className={classes.middleSide}>
            {props.checkboxChecked?null:<AddPost clicked={(caption,url)=>onAddPostClickHandler(caption,url)} />}
            
            {props.userRole.role === "user" ? null: (
              <AdminPanel checked = {()=>onAdminCheckboxChangeHandler()}  />
            )}
            {posts}
            {props.postDataLength > 0 && props.posts.length >1 ? <Spinner /> : null } 
            
          </div>
          <div className={classes.rightSide}>
            <FriendList heading="Contacts" />
            <FriendList heading="Suggestions" />
          </div>
        </div>
      </React.Fragment>
    );
  }
  return page;
};

const mapStateToProps = (state) => {
  return {
    userRole: state.userReducer.userPersonalInfo,
    loadingUser: state.userReducer.loading,
    loadingPost: state.postReducer.loading,
    posts: state.postReducer.posts,
    postDataLength: state.postReducer.postDataLength,
    checkboxChecked : state.postReducer.checkboxChecked
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserData: () => dispatch(actionTypes.fetchUserData()),
    onFetchFriendData: () => dispatch(actionTypes.fetchFriendData()),
    onFetchSuggesstedFriendData:()=> dispatch(actionTypes.fetchSuggesstedFriendData()),
    onFetchPostData: (checked,skip,limit) => dispatch(actionTypes.fetchAllPostData(checked,skip,limit)),
    onCheckboxChangeHandler : (checkedValue,skip,limit)=>dispatch(actionTypes.fetchAllPostData(checkedValue,skip,limit)),
    onCreatePostClick: (caption, url) =>
    dispatch(actionTypes.createPost(caption, url)),
    onConfirmFriendClickHandler: (id) =>
      dispatch(actionTypes.onConfirmFriendHandler(id))
    
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckToken(HomeLayout));
