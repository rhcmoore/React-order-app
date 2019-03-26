import * as actionTypes from "./actions";

const initialState = {
    ingredients: {
        skillet: 0,
        casserole: 0,
        braiser: 0,
        dutchoven: 0
    },
    totalPrice: 0
};

const INGREDIENT_PRICES = {
    skillet: 110,
    casserole: 170,
    braiser: 210,
    dutchoven: 375
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 // ingredientName recieved as payload
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1 // ingredientName recieved as payload
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;