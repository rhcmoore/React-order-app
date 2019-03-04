import React from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders"; // use configured instance
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    lettuce: 0.3,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.3
}

class Builder extends React.Component {
    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        // determine whether any items have been added
        purchaseable: false,
        // determine if used has clicked Order
        purchasing: false,
        // when T show spinner, when F show ordersummary
        loading: false
    }

    updatePurchaseState = (ingredients) => {
        // determine whether or not anything has been purchased
        const sum = Object.keys(ingredients).map(ingKey => {
            // return the amount
            return ingredients[ingKey];
            // reduce to return one result for sum
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        // updated purchaseable state to boolean (true if some items added)
        this.setState({ purchaseable: sum > 0 })
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
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
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
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, // would need to calculate on server-side in prod env
            customer: {
                name: "Rick Berry",
                address: {
                    street: "Lombard",
                    zipCode: "41414",
                    country: "USA"
                },
                email: "charlie@brown.edu"
            },
            deliveryMethod: "fastest"
        }
        axios.post("/orders.json", order) // .json is Firebase notation
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
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
        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default withErrorHandler(Builder, axios);