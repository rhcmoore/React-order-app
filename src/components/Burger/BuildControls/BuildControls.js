import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    // { label : "Lettuce", type: "lettuce"},
    // { label : "Bacon", type: "bacon"},
    // { label : "Cheese", type: "cheese"},
    // { label : "Meat", type: "meat"}
    { label : "Skillet", type: "skillet"},
    { label : "Casserole", type: "casserole"},
    { label : "Braiser", type: "braiser"},
    { label : "Dutch Oven", type: "dutchoven"}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <h3>Create Your Order</h3>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl 
                key={control.label} 
                label={control.label} 
                // pass the type of ingredient that should be added/removed
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                // so we can access the right control to disable
                disabled={props.disabled[control.type]}
            />
        ))} 

        <button 
            className={classes.OrderButton}
            disabled={!props.purchaseable} // disable if not purchaseable
            onClick={props.ordered}>
            {props.isAuth ? "Place Order" : "Sign In to Order"}
        </button>
    </div> 
)

export default buildControls;