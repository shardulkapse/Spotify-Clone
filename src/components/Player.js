import React from "react";
import classes from "./Player.module.css";
import Body from "./UI/body/Body";
import Footer from "./UI/Footer";
import Sidebar from "./UI/sidebar/Sidebar";

const Player = ({ spotify }) => {
  return (
    <div className={classes.player}>
      <div className={classes.player__body}>
        <Sidebar />
       <Body spotify={spotify}/>
      </div>
    <Footer spotify={spotify}/>
    </div>
  );
};

export default Player;
