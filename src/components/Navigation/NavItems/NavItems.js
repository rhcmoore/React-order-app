import React from "react";
import classes from "./NavItems.css";
import NavItem from "./NavItem/NavItem";

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem link="/" exact>Cookware</NavItem>
        {props.isAuthenticated 
            ? <NavItem link="/orders">Orders</NavItem>
            : null
        }
        {props.isAuthenticated 
            ? <NavItem link="/logout">Logout</NavItem> 
            : <NavItem link="/auth">Login</NavItem> 
        }
        
    </ul>
);

export default navItems;