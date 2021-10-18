import React from "react";
import { loginUrl } from "../spotify";
import classes from "./Login.module.css";
const Login = () => {
  return (
    <div className={classes.login}>
      <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt='Spotify logo'/>
      <h2>Spotify clone with basic functionality created using ReactJS.</h2>
      <a href={loginUrl}>LOGIN WITH YOUR SPOTIFY</a>
    </div>
  );
};

export default Login;
