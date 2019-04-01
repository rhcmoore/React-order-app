import React from "react";
import classes from "./NavItems.css";
import NavItem from "./NavItem/NavItem";

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem link="/" exact>Cookware</NavItem>
        <NavItem link="/orders">Orders</NavItem>
        <NavItem link="/auth">Authenticate</NavItem>
    </ul>
);

export default navItems;