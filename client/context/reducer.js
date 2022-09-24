import { authConstants } from './constants';
import { initialState } from './initial-state';

// create a reducer to update the state
export const reducer = (state, action) => {
    
    switch(action.type) {

        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                user: { ...state.user, authenticating: true }
            };
        
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    ...action.payload, // all the user data
                    ...state.user,
                    authenticating: false,
                    authed: true
                }
            };
        
        case authConstants.LOGIN_FAILURE:
            return {
                ...state,
                user: {
                    ...state.user,
                    authenticating: false,
                    authed: false,
                    error: action.payload // error being passed in
                }
            };

        case authConstants.LOGOUT_SUCCESS:
            return {
                ...state,
                user: { ...initialState }
            }

        default:
            return state;
    }
};