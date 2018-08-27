import * as actionTypes from './actionTypes';
import axios from 'axios';

// ============ logging out ============
export const logout = () => {
    // Clear local storage after logout
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');

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
                const { idToken, localId, expiresIn } = response.data;
                // Store token & expirationTime in localStorage
                localStorage.setItem('token', idToken);
                const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('localId', localId);

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

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            // session timed out, need to log in again
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const localId = localStorage.getItem('localId');
                dispatch(authSuccess(token, localId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date()) / 1000));
            }
        }
    }
}