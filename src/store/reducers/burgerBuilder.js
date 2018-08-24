import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 0.8
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const addIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
                state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    });
};

const deleteIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
                state.ingredients[action.ingredientName] - 1 >= 0
                    ? state.ingredients[action.ingredientName] - 1
                    : 0
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    });
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.DELETE_INGREDIENT:
            return deleteIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
};

export default reducer;
