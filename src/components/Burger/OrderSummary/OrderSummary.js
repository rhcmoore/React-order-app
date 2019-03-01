import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button"

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
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;