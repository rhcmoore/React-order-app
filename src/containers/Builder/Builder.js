import React from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.3
}

class Builder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 1,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        // grab old Count from state and increment
        const updatedCount = this.state.ingredients[type] + 1;
        // make a copy of ingredients and update relevant number
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        // updated total Price = old price + price addition
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        // set state with new totalPrice and ingredients
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    }

    removeIngredientHandler = (type) => {
        // grab old Count from state and increment
        const updatedCount = this.state.ingredients[type] - 1;
        // if it's already 0, exit
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        // make a copy of ingredients and update relevant number
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        // updated total Price = old price - price deduction
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        // set state with new totalPrice and ingredients
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    }

    render() {
        // copy ingredients from state
        const disabledInfo = {
            ...this.state.ingredients
        }
        // return boolean to tell if it should be disabled
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                />
            </Aux>
        )
    }
}

export default Builder;