import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../Button/button";
import axios from "axios";
import Cookies from "js-cookie";
import Spinner from "../Spinner/Spinner";
import classes from "./personalProfileCard.module.css";
import M from "materialize-css";
import * as actionTypes from "../../store/actions/index";
const PersonalProfileCard = (props) => {
  const [personInfo, setPersonInfo] = useState("");
  // const [justRender, setJustRender] = useState(true);

  // console.log(props.userData);
  const dateOfBirth = new Date(props.userData.dob);
  let temp =
    dateOfBirth.getFullYear() +
    "-" +
    ("0" + (dateOfBirth.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + dateOfBirth.getUTCDate()).slice(-2);
  const [firstname, setFirstname] = useState(props.userData.firstname);
  const [lastname, setLastname] = useState(props.userData.lastname);
  const [desig, setDesig] = useState(props.userData.desig);
  const [website, setWebsite] = useState(props.userData.website);
  const [gender, setGender] = useState(props.userData.gender);
  const [birthDate, setBirthDate] = useState(temp.toString());
  const [city, setCity] = useState(props.userData.city);
  const [state, setState] = useState(props.userData.state);
  const [zip, setZip] = useState(props.userData.zip);
  const [personalImage, setPersonalImage] = useState(
    props.userData.profileImage
  );

  useEffect(() => {
    if (!props.myProfile) {
      console.log("gg1");
      axios
        .get("http://localhost:8000/getUserData", {
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
          params: {
            personId: props.match.params.id,
          },
        })
        .then((res) => {
          setPersonInfo(res.data);
        })
        .catch((err) => {
          M.toast({
            html: "Error Fetching Data",
            classes: "rounded #f44336 red",
          });
        });
    } else {
      console.log("gg");
      const dateOfBirth = new Date(props.userData.dob);
      let temp =
        dateOfBirth.getFullYear() +
        "-" +
        ("0" + (dateOfBirth.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + dateOfBirth.getUTCDate()).slice(-2);

      setFirstname(props.userData.firstname);
      setLastname(props.userData.lastname);
      setDesig(props.userData.desig);
      setWebsite(props.userData.website);
      setBirthDate(temp.toString());
      setCity(props.userData.city);
      setZip(props.userData.zip);
      setState(props.userData.state);
      setGender(props.userData.gender);
      setPersonalImage(props.userData.profileImage);
    }
  }, [props]);

  // console.log(props.userData);

  // const [coverImage, setCoverImage] = useState(props.userData.coverImage);

  // const [formIsValid, setFormIsValid] = useState(false);
  let formIsValid = false;

  const onResetClickHandler = () => {
    setFirstname("");
    setLastname("");
    setDesig("");
    setWebsite("");
    setBirthDate("");
    setCity("");
    setZip("");
    setState("");
    setGender("");
  };

  const handleFormValidation = () => {
    if (firstname.trim() === "") {
      M.toast({
        html: "Firstname cannnot be empty",
        classes: "rounded red accent-4",
      });
      return null;
    }
    if (/\d/.test(firstname)) {
      M.toast({
        html: "Firstname cannnot contain number",
        classes: "rounded red accent-4",
      });
      return null;
    }

    if (lastname.trim() === "") {
      M.toast({
        html: "Lastname cannnot be empty",
        classes: "rounded red accent-4",
      });
      return null;
    }

    if (/\d/.test(lastname)) {
      M.toast({
        html: "Lastname cannnot contain number",
        classes: "rounded red accent-4",
      });
      return null;
    }

    if (!website || website.trim() === "") {
      M.toast({
        html: "Website cannnot be empty",
        classes: "rounded red accent-4",
      });
      return null;
    }

    // if(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/.test(website))
    // {
    //   M.toast({html:"Not a valid website",classes:'rounded red accent-4'})
    //   return null
    // }
    if (!birthDate || birthDate === "NaN-NaN-NaN") {
      M.toast({
        html: "BirthDate cannnot be empty",
        classes: "rounded red accent-4",
      });
      return null;
    }
    if (!desig || desig.trim() === "") {
      M.toast({
        html: "Designation cannnot be empty",
        classes: "rounded red accent-4",
      });
      return null;
    }

    if (!city || city.trim() === "") {
      M.toast({
        html: "City cannnot be empty",
        classes: "rounded red accent-4",
      });
      return null;
    }

    if (!city || /\d/.test(city)) {
      M.toast({
        html: "City cannnot contain number",
        classes: "rounded red accent-4",
      });
      return null;
    }

    if (!state || state.trim() === "") {
      M.toast({
        html: "State cannnot be empty",
        classes: "rounded red accent-4",
      });
      return null;
    }

    if (!zip || / ^[0-9]*$/.test(zip)) {
      M.toast({ html: "Not valid zip code", classes: "rounded red accent-4" });
      return null;
    }

    if (!gender || gender.trim() === "") {
      M.toast({
        html: "Gender cannnot be empty",
        classes: "rounded red accent-4",
      });
      return null;
    }
    formIsValid = true;
  };

  const onSaveClickHandler = () => {
    handleFormValidation();
    if (formIsValid) {
      let userDataObj = null;
      if (personalImage === props.userData.profileImage) {
        console.log("hello");
        userDataObj = {
          firstname: firstname,
          lastname: lastname,
          desig: desig,
          website: website,
          gender: gender,
          birthDate: birthDate,
          city: city,
          state: state,
          zip: zip,
          personalImage: personalImage,
        };
        // console.log(userDataObj);
        // M.toast({ html: "Post Image Cant Be Empty", classes: "rounded #f44336 red" });
        // return;
        props.onSaveUserClick(userDataObj);
      } else {
        console.log("hi");

        const data = new FormData();
        data.append("file", personalImage);
        data.append("upload_preset", "buzz_app");
        data.append("cloud-name", "djhbl2dv4");
        axios
          .post("https://api.cloudinary.com/v1_1/djhbl2dv4/image/upload", data)
          // .then((res) => res.json())
          .then((data) => {
            // console.log(data.data.url)
            // setUrl(data.url);
            userDataObj = {
              firstname: firstname,
              lastname: lastname,
              desig: desig,
              website: website,
              gender: gender,
              birthDate: birthDate,
              city: city,
              state: state,
              zip: zip,
              personalImage: data.data.url,
            };
            props.onSaveUserClick(userDataObj);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      return null;
    }
  };

  let data = <Spinner />;
  let bellowInfo = (
    <React.Fragment>
      <div className={classes.profileInfo}>
        <p className={classes.heading}>
          {props.userData.firstname} {props.userData.lastname}
        </p>
      </div>
      <div className={classes.lowerInfoForForm}>
        <div className={classes.formEachRow}>
          <div className={classes.formEachEle}>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              placeholder="First name"
              id="firstname"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
          </div>
          <div className={classes.formEachEle}>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              placeholder="Last name"
              id="lastname"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
          </div>
        </div>
        {/* iiiiiiiiiiiiiiiiiii */}
        <div className={classes.formEachRow}>
          <div className={classes.formEachEle}>
            <label>Designation</label>
            <input
              type="text"
              placeholder="Co Founder"
              value={desig}
              onChange={(event) => setDesig(event.target.value)}
            />
          </div>
          <div className={classes.formEachEle}>
            <label>My Website</label>
            <input
              type="text"
              placeholder="example.com"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>
        </div>
        {/* iiiiiiiiiiiiiiiiiiiiiiiiii */}
        <div className={classes.formEachRow}>
          <div className={classes.formEachEle}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              style={{ width: "282px" }}
              onChange={(event) => setGender(event.target.value)}
            >
              <option defaultValue="" disabled selected>
                {gender}
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className={classes.formEachEle}>
            <label>Birthday</label>
            <input
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
            />
          </div>
        </div>
        {/* iiiiiiiiiiiiiiiiiiiiiiiiii */}
        <div className={classes.formEachRow}>
          <div className={classes.formEachEle}>
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <div className={classes.innerFormStateAndZip}>
            <div className={classes.formEachEle}>
              <label htmlFor="state">State</label>
              <select
                id="state"
                onChange={(event) => setState(event.target.value)}
              >
                <option value="" disabled selected>
                  {state}
                </option>
                <option value="up">UP</option>
                <option value="delhi">Delhi</option>
                <option value="gujarat">Gujarat</option>
                <option value="haryana">Haryana</option>
                <option value="mp">MP</option>
              </select>
            </div>
            <div className={classes.formEachEle}>
              <label>Zip</label>
              <input
                type="text"
                placeholder="Zip code"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
              />
            </div>
          </div>
        </div>
        {/* iiiiiiiiiiiiiiiiiiiiiiiiiiii */}
        <div className={classes.formEachRow}>
          <div className={classes.formButtonRow}>
            <Button
              type="normal"
              buttonClass="userWebsiteButton"
              text="Save"
              clicked={() => onSaveClickHandler()}
            />
            <Button
              type="normal"
              buttonClass="userWebsiteButton"
              text="Reset"
              clicked={() => onResetClickHandler()}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
  if (!props.myProfile) {
    bellowInfo = (
      <React.Fragment>
        <div className={classes.profileInfo}>
          <p className={classes.heading}>
            {personInfo.firstname} {personInfo.lastname}
          </p>
          <p className={classes.subHeading1}>{personInfo.desig?personInfo.desig:"Newer"} at TTN</p>
          <p className={classes.subHeading2}>
            {personInfo.state?personInfo.state:"No Information"} * {personInfo.city?personInfo.city:"No Information"} * {personInfo.friendCount } Freinds
            <br />
            <p style={{textTransform:"lowercase",margin:"0",padding:"0"}}>
            {personInfo.alreadyFriends?personInfo.email:null}
            </p>
          </p>
        </div>
        <div className={classes.lowerInfo}>
          {!personInfo.alreadyFriends ? (
            <Button
              type="fevi"
              feviClass="fas fa-user-plus"
              buttonClass="userProfileButton"
              text="Add Friend"
              clicked={() => props.onAddFriendClickHandler(personInfo._id,props)}
            />
          ) : null}

          <Button
            type="fevi"
            feviClass="fas fa-external-link-alt"
            buttonClass="userWebsiteButton"
            text="Visit Website"
            clicked={() =>
              window.open("http://" + personInfo.website, "_blank")
            }
          />
        </div>
      </React.Fragment>
    );
  }
  if (!props.loading && props.userData) {
    console.log(personInfo);
    data = (
      <div className={classes.container}>
        <div className={classes.subContainer}>
          <div className={classes.coverImage}>
            <div>
              <img
                src={
                  personInfo
                    ? personInfo.profileImage
                    : props.userData.profileImage
                }
                alt="ProfileImage"
                className={classes.profileImage}
              />
              {props.myProfile ? (
                <Button
                  type="fevi"
                  feviClass="fas fa-camera"
                  buttonClass="addImage"
                  for="actual-btn"
                  clicked={() => document.getElementById("actual-btn").click()}
                />
              ) : null}

              <input
                type="file"
                id="actual-btn"
                hidden
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setPersonalImage(e.target.files[0])}
                // onChange=
              />
            </div>

            {/* <Button
              type="fevi"
              feviClass="fas fa-camera"
              buttonClass="addCover"
              text="Change Cover"
            />
            <input
              type="file"
              id="actual-btn"
              hidden
              multiple
              accept=".png,.jpg,.jpeg"
              // onChange={(e) => ser(e.target.files[0])}
              // onChange=
            /> */}
          </div>
          {bellowInfo}
        </div>
      </div>
    );
  }
  return data;
};

const mapStateToProps = (state) => {
  return {
    userData: state.userReducer.userPersonalInfo,
    loading: state.userReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddFriendClickHandler: (id,props) =>
    {
      props.history.replace("/home")
      return dispatch(actionTypes.onAddFriendHandler(id))
    },
    onSaveUserClick: (userObj) => dispatch(actionTypes.updateUserData(userObj)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PersonalProfileCard));
