import React, { useState } from "react";
import Button from "../Button/button";
import { connect } from "react-redux";
import classes from "./post.module.css";
import * as actionTypes from "../../store/actions/index";

const Post = (props) => {
  // console.log(props);

  const [postImage, setPostImage] = useState(props.images);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const goToPrevSlide = () => {
    if (currentIndex === 0) return;

    setCurrentIndex(currentIndex - 1);
    setTranslateValue(translateValue + slideWidth());
  };

  const goToNextSlide = () => {
    if (currentIndex === postImage.length - 1) {
      setCurrentIndex(0);
      setTranslateValue(0);
      return;
    }
    setCurrentIndex(currentIndex + 1);
    setTranslateValue(translateValue + -slideWidth());
  };

  const slideWidth = () => {
    return document.querySelector(`.${classes.slide}`).clientWidth;
  };

  let showComments = <span>No Comments.Be the first to comment</span>;
  if (props.comments.length > 0) {
    showComments = props.comments.map((item) => {
      return (
        <div
          className={classes.commentContainer}
          key={item.postedBy._id + item.comment}
        >
          <img
            src={item.postedBy.profileImage}
            className={classes.personCommentImage}
            key={item.postedBy._id}
            alt="Person_Comment_Image"
          />
          <span>{item.comment}</span>
        </div>
      );
    });
  }
  let [comment, setComment] = useState("");

  const commentChangedHandler = (event) => {
    setComment(event.target.value);
  };

  const createdDate = new Date(props.createdAt);
  let etc = createdDate.toDateString();
  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
        {/* Start Top Post Info */}
        <div className={classes.topProfile}>
          <div className={classes.topProfileLeft}>
            <div>
              <img
                src={props.postedBy.profileImage}
                className={classes.personImage}
                alt="profilePhoto"
              />
            </div>
            <div className={classes.personInfo}>
              <p>
                {props.postedBy.firstname} {props.postedBy.lastname}
              </p>
              <p>{etc.toString()}</p>
            </div>
          </div>

          {/* Option Button */}
          <div className={classes.reportDropdown}>
            {props.checkboxChecked ? (
              <label style={{ color: "black", marginRight: "10px" }}>
                Report Count : {props.reportCount}
              </label>
            ) : null}
            <Button
              type="fevi"
              feviClass="fas fa-ellipsis-h"
              buttonClass="searchButton"
            />
            <div className={classes.reportDropdownContent}>
              {props.checkboxChecked ? (
                <React.Fragment>
                  <Button
                    type="fevi"
                    feviClass="fas fa-trash-alt"
                    buttonClass="logoutButton"
                    text="Delete Post"
                    clicked={() =>
                      props.onDeletePostHandler(
                        props._id,
                        props.checkboxChecked,
                        props.skip,
                        props.limit
                      )
                    }
                  />
                </React.Fragment>
              ) : (
                <Button
                  type="fevi"
                  feviClass="fas fa-bug"
                  buttonClass="logoutButton"
                  text="Report Post"
                  clicked={() => props.onReportClickHandler(props._id,props.checkboxChecked,props.skip,props.limit)}
                />
              )}
              {/* <Button
                type="fevi"
                feviClass="fas fa-bug"
                buttonClass="logoutButton"
                text="Report Post"
                clicked={() => props.onReportClickHandler(props._id)}
              /> */}
            </div>
          </div>
        </div>
        {/* End Top Post Info */}
        {/* Start of Caption */}
        <span className={classes.caption}>{props.caption}</span>
        {/* End Of Captin */}
        {/* Start OF Post image */}

        <div className={classes.slider}>
          <div
            className={classes.sliderWrapper}
            style={{
              transform: `translateX(${translateValue}px)`,
              transition: "transform ease-out 0.45s",
            }}
          >
            {postImage.map((image, i) => (
              <Slide key={i} image={image} />
            ))}
          </div>
          {postImage.length > 1 ? (
            <React.Fragment>
              <LeftArrow goToPrevSlide={() => goToPrevSlide()} />
              <RightArrow goToNextSlide={() => goToNextSlide()} />{" "}
            </React.Fragment>
          ) : null}
        </div>

        {/* <img
          className={classes.postImage}
          src={props.images[0]}
          alt="PostImage"
        /> */}

        {/* End Of Post Image */}
        {/* Start Like Dislike Comment Count */}
        <div className={classes.countSession}>
          <div className={classes.countSessionLeft}>
            <i className="fas fa-thumbs-up"></i>
            <span>{props.like}</span>
            <i className="fas fa-heart-broken"></i>
            <span>{props.dislike}</span>
          </div>
          <span>{props.comments.length} Comment</span>
        </div>
        {/* End Like Dislike Comment Count  */}
        {/* Start Buttons */}
        <div className={classes.buttonSection}>
          <Button
            type="fevi"
            feviClass="fas fa-thumbs-up"
            buttonClass="postButton"
            text="Like"
            clicked={() => props.onLikeClickHandler(props._id,props.checkboxChecked,props.skip,props.limit)}
            disabled = {props.checkboxChecked?"disabled":null}
          />
          <Button
            type="fevi"
            feviClass="fas fa-heart-broken"
            buttonClass="postButton"
            text="Dislike"
            clicked={() => props.onDislikeClickHandler(props._id,props.checkboxChecked,props.skip,props.limit)}
            disabled = {props.checkboxChecked?"disabled":null}
          />
          {/* <Button
            type="fevi"
            feviClass="fas fa-comment"
            buttonClass="postButton"
            text="Comment"
          /> */}
        </div>
        {/* End Buttons */}
        {/* Start Comment Section */}
        <div className={classes.commentSectionToShow}>{showComments}</div>
        <form
          onSubmit={(event) => {
            event.target.reset();
            setComment("")
            props.onSubmitCommentHandler(event, props._id, comment,props.checkboxChecked,props.skip,props.limit);
          }}
        >
          <div className={classes.commentSectionToWrite}>
          {props.checkboxChecked?null:
          <React.Fragment>
            <img
              src={props.userImage}
              className={classes.personImage}
              alt="profilePhoto"
            />
             <input
              type="text"
              style={{ width: "85%" }}
              className={classes.postInput}
              placeholder="Write a comment..."
              value={comment}
              onChange={(event) => commentChangedHandler(event)}
            />
            </React.Fragment>
            
            }
           
          </div>
        </form>
        {/* End Comment Section */}
      </div>
    </div>
  );
};

const LeftArrow = (props) => {
  return (
    <div
      className={`${classes.backArrow} ${classes.arrow}`}
      onClick={props.goToPrevSlide}
    >
      <i className="fas fa-chevron-left fa-1x" aria-hidden="true"></i>
    </div>
  );
};

const RightArrow = (props) => {
  return (
    <div
      className={`${classes.nextArrow} ${classes.arrow}`}
      onClick={props.goToNextSlide}
    >
     
      <i className="fas fa-chevron-right fa-1x" aria-hidden="true"></i>
    </div>
  );
};

const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return <div className={classes.slide} style={styles}></div>;
};

const mapStateToProps = (state) => {
  return {
    userImage: state.userReducer.userPersonalInfo.profileImage,
    checkboxChecked: state.postReducer.checkboxChecked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLikeClickHandler: (postId,checked,skip,limit) =>
      dispatch(actionTypes.postLikeClicked(postId,checked,skip,limit)),
    onDislikeClickHandler: (postId,checked,skip,limit) =>
      dispatch(actionTypes.postDisikeClicked(postId,checked,skip,limit)),
    onSubmitCommentHandler: (event, postId, comment,checked,skip,limit) =>
      dispatch(actionTypes.postCommentSubmit(event, postId, comment,checked,skip,limit)),
    onReportClickHandler: (postId,checked,skip,limit) => dispatch(actionTypes.reportPost(postId,checked,skip,limit)),
    onDeletePostHandler: (postId, checked,skip,limit) =>
      dispatch(actionTypes.deletePost(postId, checked,skip,limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
