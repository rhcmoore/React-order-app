import React from "react";
// import so webpack can locate
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.css";

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Logo" />
    </div>
);

export default logo;