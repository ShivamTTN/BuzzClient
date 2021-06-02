import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Button from "../Button/button";
import * as actionTypes from "../../store/actions/index";
import classes from "./addPost.module.css";
import M from "materialize-css";

const AddPost = (props) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  // const [url, setUrl] = useState("");



  const getUrls = async (data) => {
    
    let url =  await axios.post("https://api.cloudinary.com/v1_1/djhbl2dv4/image/upload", data)
      // .then((res) => res.json())
      .then((data) => {
        // console.log(data.data.url)
        // setUrl(data.url);
        // imgUrls.push(data.data.url)
        return data.data.url;

      })
      .catch((err) => {
        console.log(err);
      });

      return url
  
   
  };

  const postDetails = async () => {
    
    if (!caption) {
      M.toast({
        html: "Post Caption Cant Be Empty",
        classes: "rounded #f44336 red",
      });
      return;
    }
    // if (!image) {
    //   M.toast({
    //     html: "Post Image Cant Be Empty",
    //     classes: "rounded #f44336 red",
    //   });
    //   return;
    // }

    props.fetchPostStart();
      const newObj = {
        ...image
      }
      const newArr = []
      for(let key in newObj)
      {
        newArr.push(newObj[key])
      }
      const imgUrls = []
      await Promise.all(
       newArr.map(async (item)=>{
        const data = new FormData();
        data.append("file", item);
        data.append("upload_preset", "buzz_app");
        data.append("cloud-name", "djhbl2dv4");
        let getUrl = await getUrls(data)
        // console.log(getUrl)
        imgUrls.push(getUrl)

        })
      )
      // console.log(imgUrls)
      setCaption("")
      props.clicked(caption,imgUrls)
      // props.onCreatePostClick(caption,imgUrls)

      
      // for(let key in newObj)
      // {
        // const data = new FormData();
        // data.append("file", newObj[key]);
        // data.append("upload_preset", "buzz_app");
        // data.append("cloud-name", "djhbl2dv4");
      //   let getUrl = await getUrls(data)
      //   // imgUrls.push(getUrls)
      //   console.log(getUrl)
      // }

      
      // console.log(imgUrls)

      // Object.keys(temp).forEach( async key=>{
        // const data = new FormData();
        // data.append("file", image[key]);
        // data.append("upload_preset", "buzz_app");
        // data.append("cloud-name", "djhbl2dv4");
        // axios.post("https://api.cloudinary.com/v1_1/djhbl2dv4/image/upload", data)
        //   // .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data.data.url)
        //     // setUrl(data.url);
        //     // imgUrls.push(data.data.url)

        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      // })
    

    // console.log(imgUrls)
    
  };

  return (
  
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <div>
          <img
            src={props.userData.profileImage}
            className={classes.personImage}
            alt="profilePhoto"
          />
        </div>
        <div className={classes.textBoxDiv}>
          <input
            type="text"
            className={classes.postInput}
            placeholder="Start a post..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div>
          <Button
            type="fevi"
            feviClass="fas fa-images"
            buttonClass="addPostButton"
            text="Photo/Photos"
            for="actual-btn"
            clicked={() => document.getElementById("actual-btn").click()}
          />
          <input
            type="file"
            id="actual-btn"
            hidden
            multiple
            accept=".png,.jpg,.jpeg"
            onChange={(e) => setImage(e.target.files)}
            // onChange=
          />
        </div>
        {/* <div style={{"margin":"0 auto"}}>
          <span id="file-chosen" className={classes.fileNames}>
            No file chosen
          </span>
        </div> */}
        <div>
          <Button
            type="normal"
            buttonClass="createPostButton"
            text="Post"
            for="actual-btn"
            clicked={() => postDetails()}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userData: state.userReducer.userPersonalInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    fetchPostStart: () => dispatch(actionTypes.fetchPostStart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
