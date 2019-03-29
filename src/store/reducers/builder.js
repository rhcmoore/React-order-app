import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
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
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    skillet: action.ingredients.skillet,
                    braiser: action.ingredients.braiser,
                    casserole: action.ingredients.casserole,
                    dutchoven: action.ingredients.dutchoven
                },
                totalPrice: 0,
                error: false
            };
        case actionTypes.FETCH_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;