import React from "react";

import burgerLog from "../../assets/burger-logo.png";
import classes from "./Logo.css";

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLog} alt="MyBurger" />
    </div>
);

export default logo