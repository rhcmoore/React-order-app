import React from "react";
import Aux from "../../../hoc/Aux"

// for modal
const orderSummary = (props) => {

    // transform object to array
    const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
        return (
            <li key={ingKey}>
                <span style={ {textTransform: "capitalize"} }>{ingKey}</span>
                : {props.ingredients[ingKey]}
            </li>
        )
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your order includes:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Checkout</p>
        </Aux>
    )
}

export default orderSummary;