import { Data } from "../../data/data";
import moment from "moment";

import {
    CHANGE_TODO_IS_DONE,
    CHANGE_TODO_STATUS,
    CHANGE_TODO_TIME,
    CHANGE_TODO_DATE,
    EDIT_TODO_TITLE,
    ADD_NEW_TASK,
    FILTER_TODOS,
    REMOVE_TODO,
    TodoAction,
    SORT_TODOS,
} from "../types";

const initialState: Todo[] = Data;

const todoReducer = (
    state: Todo[] = initialState,
    action: TodoAction
): Todo[] => {
    switch (action.type) {
        case CHANGE_TODO_IS_DONE:
            return (state = state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        isDone: !todo.isDone,
                    };
                }
                return todo;
            }));

        case CHANGE_TODO_STATUS:
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        isPaused: !todo.isPaused,
                    };
                }
                return todo;
            });

        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.payload.id);

        case EDIT_TODO_TITLE:
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    if (
                        todo.title !== action.payload.title.trim() &&
                        action.payload.title.trim() !== ""
                    ) {
                        return {
                            ...todo,
                            title: action.payload.title,
                        };
                    }
                }
                return todo;
            });

        case CHANGE_TODO_DATE:
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        date: action.payload.date,
                    };
                }
                return todo;
            });

        case CHANGE_TODO_TIME:
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        time: action.payload.time,
                    };
                }
                return todo;
            });

        case SORT_TODOS:
            const sortTodos = () => {
                if (action.payload.isAsc) {
                    return state.sort((a, b) =>
                        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
                    );
                } else {
                    return state.sort((a, b) =>
                        a.title < b.title ? 1 : b.title < a.title ? -1 : 0
                    );
                }
            };

            return (state = sortTodos());

        case FILTER_TODOS:
            const now = moment();
            let filteredTodos: Todo[] = [];
            filteredTodos = state.map((item) => {
                if (moment(item.date).diff(now, action.payload.state) === 0) {
                    item.isVisible = true;
                } else {
                    item.isVisible = false;
                }
                return item;
            });
            state = filteredTodos;
            return state;

        case ADD_NEW_TASK:
            const id = state.length === 0 ? 0 : state[state.length - 1].id + 1;
            action.payload.todo = { ...action.payload.todo, id: id };
            return [...state, action.payload.todo];

        default:
            return state;
    }
};

export default todoReducer;
