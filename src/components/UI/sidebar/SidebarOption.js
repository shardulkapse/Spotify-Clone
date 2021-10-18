import React from "react";
import classes from "./SidebarOption.module.css";



const SidebarOption = ({ title, Icon, }) => {

  return (
    <div className={classes.sidebarOption}>
      {Icon && <Icon className={classes.icon} />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
};

export default SidebarOption;
