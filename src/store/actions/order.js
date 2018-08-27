import * as actionTypes from './actionTypes';

import axios from '../../axios-order';

// payload: {id, orderData}
export const purchaseSuccess = payload => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: payload.orderId,
        orderData: payload.orderData
    };
};

export const purchaseFailure = payload => {
    return {
        type: actionTypes.PURCHASE_FAILURE,
        error: payload.error
    };
};

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const purchase = payload => {
    return (dispatch, getState) => {
        // Firebase database requires suffix '.json'
        dispatch(purchaseStart());

        // extract token from payload and do not save it in DB
        const token = payload.token;

        axios
            .post(`/orders.json?auth=${token}`, payload)
            .then(res => {
                // Remove loader
                dispatch(purchaseSuccess(payload));
            })
            .catch(err => {
                dispatch(purchaseFailure(err));
            });
    };
};

// fetching orders
export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };
};

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return (dispatch, getState) => {
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        // Only allow authorized user to access /order.json
        axios
            .get(`/orders.json${queryParams}`)
            .then(res => {
                dispatch(fetchOrdersStart());

                const orders = [];
                // Store orders fetched from firebase to state while preserving unique id
                for (let key in res.data) {
                    orders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                dispatch(fetchOrdersSuccess(orders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    };
};
