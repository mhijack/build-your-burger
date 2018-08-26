import * as actionTypes from './actionTypes';
import axios from 'axios';

// ============ logging out ============
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

// clear token after expirationTime has passed
export const checkAuthTimeout = expirationTime => {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
// ===========================

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        const apiKey = 'AIzaSyAPEe_COxzxnzh-QpsdafI--pV30KOYR48';
        let method = isSignUp ? 'signupNewUser' : 'verifyPassword';
        const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${method}?key=${apiKey}`;

        axios
            .post(url, authData)
            .then(response => {
                const { idToken, localId } = response.data;
                // console.log(response.data);
                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                // console.log(error);
                dispatch(authFail(error.response.data.error));
            });
    };
};
