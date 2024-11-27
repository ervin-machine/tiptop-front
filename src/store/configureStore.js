import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Correctly importing thunk
import createReducer from "../reducers";

export default function configureStore(history, initialState = {}) {
    const store = createStore(
        createReducer(history),
        initialState,
        applyMiddleware(thunk)
    );

    console.log("Store initialized with state:", store.getState());
    return store;
}
