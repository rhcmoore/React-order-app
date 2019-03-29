import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action)  => {
    return updateObject(state, { purchased: false })
}

const purchaseStart = (state, action)  => {
    return updateObject(state, { loading: true });
}

const purchaseSuccess = (state, action)  => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
            return updateObject(state, {
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            });
}

const purchaseFailed = (state, action)  => {
    return updateObject(state, { loading: false });
}

const fetchOrdersStart = (state, action)  => {
    return updateObject(state, { loading: true })
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { 
        orders: action.orders,
        loading: false
     });
}

const fetchOrdersFailed = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_START: return purchaseStart(state, action);
        case actionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_FAILED: return purchaseFailed(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
        default: return state;
    }
}

export default reducer;