import React from "react";
//Components
import Button from "../../components/Button/button";
//Css
import classes from "./loginPage.module.css";
import logo from "../../assets/Logo/darkLogo.png";

const loginPage = () => {
  return (
    <div className={classes.container}>
      <ul>
        <li>
          <img src={logo} alt="Logo" />
          <div className={classes.leftHeading}>
            <p className={classes.heading}>
              Enter your details and Start your journey with us
            </p>
            <p className={classes.subHeading}>
              Don't stop until you're proud.{" "}
            </p>
          </div>
          <a href="http://localhost:8000/auth/google" className={classes.google}>Sign in with Google</a>
          {/* <Button redirect="http://localhost:8000/auth/google" type="normal" buttonClass="google" text="Sign in with Google" /> */}
        </li>
        {/* <hr /> */}
        <li style={{width:"60%"}}>
          <p className={classes.loginHeading}>Login To Your Account</p>
          <input type="text" className={classes.inputFormField} placeholder="TTN Username" />
          <input type="text" className={classes.inputFormField} placeholder="Password" />
          <div className={classes.underLoginInput}>
            <div>
              <input type="checkbox" id="remember" name="remember_me" />
              <label htmlFor="remember" style={{padding:"10px"}}>Remember Me</label>
            </div>
            <a href="/">Forgot Password?</a>
          </div>
          <Button type="normal" buttonClass="localSignIn" text="Sign In" />
        </li>
      </ul>
    </div>
  );
};

export default loginPage;
