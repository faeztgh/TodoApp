import { combineReducers } from "redux";
import alertReducer from "./AlertReducer";
import todoReducer from "./TodoReducer";
const allReducers = combineReducers({
    todos: todoReducer,
    alert: alertReducer,
});

export type RootState = ReturnType<typeof allReducers>;

export default allReducers;
