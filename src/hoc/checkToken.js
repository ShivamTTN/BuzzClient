import React from "react";
import Cookies from "js-cookie";
const checkToken = (WrappedComponent, axios) => {
  //let data = Cookies.get("token")?props.children:props.history
  return (props) => {
    let data = null;
    if (Cookies.get("token")) {
      data = <WrappedComponent {...props} />;
    } else {
      props.history.push("/")
    }
    return data;
  };
};

export default checkToken;
