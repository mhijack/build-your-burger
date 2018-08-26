import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredients = payload => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: payload.ingredientName
    };
};

export const deleteIngredients = payload => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        ingredientName: payload.ingredientName
    };
};

// Initiating ingredients
const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    };
};

const fetIngredientsFailed = error => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error
    };
};

export const initIngredients = () => {
    return (dispatch, getState) => {
        axios
            .get(
                'https://builder-your-burger-react.firebaseio.com/ingredients.json'
            )
            .then(response => {
                // console.log(response.data)
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                console.log('error while initiating ingredients.');
                dispatch(fetIngredientsFailed(error));
            });
    };
};
