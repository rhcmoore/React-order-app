import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

// sync 
export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
// sync
export const purchaseFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_FAILED,
        error: error
    }
};

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    };
}

// async
export const purchase = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseStart());
        // post order to db
        axios.post("/orders.json?auth=" + token, orderData) // .json is Firebase notation
            .then(response => {
                dispatch(purchaseSuccess(response.data.name, orderData))
            }).catch(error => {
                dispatch(purchaseFailed(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

// async
export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = `?auth=${token}"&orderBy="userId"&equalTo="${userId}"`;
        axios.get("/orders.json" + queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }).catch(err => {
            dispatch(fetchOrdersFailed(err))
        })
    }
}