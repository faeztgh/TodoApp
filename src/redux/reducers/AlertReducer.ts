import { AlertAction, SET_ALERT } from "../types";

const initialState: AlertDetails = {
    color: "",
    message: "",
    type: "",
};

const alertReducer = (
    state = initialState,
    action: AlertAction
): AlertDetails => {
    switch (action.type) {
        case SET_ALERT:
            return {
                color: action.payload.color,
                message: action.payload.message,
                type: action.payload.type,
            };
        default:
            return state;
    }
};

export default alertReducer;
