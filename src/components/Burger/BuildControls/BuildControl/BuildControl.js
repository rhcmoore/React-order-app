import React from "react";
import classes from "./BuildControl.css"

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        {/* on click, add or remove ingredient */}
        <button 
            className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabled}>
            <h1>-</h1>
        </button>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.More} 
            onClick={props.added} 
        >
            <h1>+</h1>
        </button>
    </div>
)

export default buildControl;