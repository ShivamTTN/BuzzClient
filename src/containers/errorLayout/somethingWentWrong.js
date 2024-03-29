import React from "react";
import { Link} from 'react-router-dom'

import errorLogo from "../../assets/image/SWW.png";
import classes from "./somethingWentWrong.module.css";
const SomethingWentWrong = (props) => {
  return (
    <div className={classes.container}>
      <div>
        <img src={errorLogo} height="100" alt="Error" width="100" />
      </div>
      <div>
        <p>Something Went Wrong .......</p>
      </div>
        <Link to="/" className><i class="fas fa-long-arrow-alt-left"> Go back to home</i></Link>
    </div>
  );
};
export default SomethingWentWrong;
