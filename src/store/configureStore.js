import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Correctly importing thunk
import createReducer from "../reducers";
import { routerMiddleware } from "connected-react-router";

export default function configureStore(history, initialState = {}) {
    const store = createStore(
        createReducer(history),
        initialState,
        applyMiddleware(routerMiddleware(history), thunk)
    );
    return store;
}
