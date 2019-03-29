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
import * as builderActions from "../../store/actions/index"

class Builder extends React.Component {
    // For UI state only, the rest managed in Redux
    state = {
        purchasing: false, // determine if used has clicked Order
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        // determine whether or not anything has been selected
        const sum = Object.keys(ingredients).map(ingKey => {
            // return the amount
            return ingredients[ingKey];
            // reduce to return one result for sum
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        console.log("init purchase")
        this.props.history.push("/checkout");
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
        let burger = this.props.error ? <p>Can't load ingredients</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
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

// fetching from global state
const mapStateToProps = state => {
    return {
        ings: state.builder.ingredients,
        price: state.builder.totalPrice,
        error: state.builder.error
    }
}

// sending to reducer values as props
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(builderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(builderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(builderActions.initIngredients()),
        onInitPurchase: () => dispatch(builderActions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Builder, axios));