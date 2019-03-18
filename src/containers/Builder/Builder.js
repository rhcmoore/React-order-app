import React from "react";
import {connect} from "react-redux";
import axios from "../../axios-orders"; // use configured instance
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

const INGREDIENT_PRICES = {
    lettuce: 0.3,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.3
}

class Builder extends React.Component {
    state = {
        totalPrice: 4, // base price $4
        purchaseable: false, // determine whether any items have been added
        purchasing: false, // determine if used has clicked Order
        loading: false, // when T show spinner, when F show ordersummary
        error: false
    };

    componentDidMount() {
        // axios.get("https://order-e8ff6.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     }).catch(error => {
        //         this.setState({error: true});
        //     });
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            // push key/=/value pairs into array 
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        // add total price to query params
        queryParams.push("price=" + this.state.totalPrice)
        const queryString = queryParams.join("&");
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
    }

    render() {
        // copy ingredients from state
        const disabledInfo = {
            ...this.props.ings // from store
        }
        // return boolean to tell if it should be disabled
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Can't load ingredients</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Builder, axios));