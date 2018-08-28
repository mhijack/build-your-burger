import reducer from '../store/reducers/auth';
import * as actionTypes from '../store/actions/actionTypes';

describe('testing auth reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        };
    });

    it('should return default initial state if state omitted', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store token upon login', () => {
        expect(
            reducer(initialState, {
                type: actionTypes.AUTH_SUCCESS,
                idToken: 'testToken',
                userId: 'testId'
            })
        ).toEqual({ ...initialState, token: 'testToken', userId: 'testId' });
    });
});
