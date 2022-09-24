import { createContext, useContext, useReducer } from 'react';
import { initialState } from './initial-state';
import { reducer } from './reducer';

// global store
// basic store that can be passed across the whole application
const Store = createContext();
// create hook to use the store throughout the app
export const useStore = () => useContext(Store);

// create a store provider method
export const StoreProvider = ({ children }) => {
    // initial object with the reducer method
    const [state, dispatch] = useReducer(reducer, { ...initialState });

    return (
        <Store.Provider value={[state, dispatch]}>
            {/* the children will be the app component */}
            {children}
        </Store.Provider>
    )
};