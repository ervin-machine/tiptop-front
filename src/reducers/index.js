import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import adminReducer from "../features/admin/store/reducers";
import candidateReducer from "../features/candidates/store/reducers";
import interviewReducer from "../features/interviews/store/reducers";
import userReducer from "../features/profile/store/reducers";

export default function createReducer(history, injectReducers = {}) {
    return combineReducers({
        router: connectRouter(history), // Include the router key
        adminData: adminReducer,
        candidate: candidateReducer,
        interview: interviewReducer,
        user: userReducer,
        ...injectReducers,
    });
}
