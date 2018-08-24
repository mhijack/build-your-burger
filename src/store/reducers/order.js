import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });
        case actionTypes.PURCHASE_START:
            return updateObject(state, { loading: true });
        case actionTypes.PURCHASE_SUCCESS:
            return updateObject(state, { loading: false, purchased: true });
        case actionTypes.PURCHASE_FAILURE:
            return updateObject(state, { loading: false });
        // fetching orders
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            });
        default:
            return state;
    }
};

export default reducer;
