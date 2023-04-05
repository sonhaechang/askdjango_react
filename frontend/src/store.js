import React, { createContext, useContext } from "react";
import useReducerWithSideEffects, {
    UpdateWithSideEffect
} from 'use-reducer-with-side-effects';
import { getStorageItem, setStorageItem } from "utils/useLocalStorage";

const AppContext = createContext();

const reducer = (prevState, action) => {
    const { type } = action;
  
    if (type === SET_TOKEN) {
        const { payload: accessToken } = action;
        const newState = { ...prevState, accessToken, isAuthenticated: true };

        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem('accessToken', accessToken);
        });
    } else if (type === DELETE_TOKEN) {
        const newState = { ...prevState, accessToken: '', isAuthenticated: true };

        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem('accessToken', '');
        });
    }
  
    return prevState;
  };

export const AppProvider = ({ children }) => {
    const accessToken = getStorageItem('accessToken', '');
    const [store, dispatch] = useReducerWithSideEffects(reducer, {
        accessToken,
        isAuthenticated: accessToken.length > 0
    });

    return (
        <AppContext.Provider value={{ store, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

// Actions
const SET_TOKEN = 'APP/SET_TOKEN';
const DELETE_TOKEN = 'APP/DELETE_TOKEN';

// Action Creators
export const setToken = token => ({ type: SET_TOKEN, payload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });