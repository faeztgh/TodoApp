import * as Types from "../types";

export const editTaskTitleAction = (id: number, title: string) => {
    return {
        type: Types.EDIT_TODO_TITLE,
        payload: {
            id,
            title,
        },
    };
};

export const removeTodoAction = (id: number) => {
    return {
        type: Types.REMOVE_TODO,
        payload: {
            id,
        },
    };
};

export const changeTodoStatusAction = (id: number) => {
    return {
        type: Types.CHANGE_TODO_STATUS,
        payload: {
            id,
        },
    };
};

export const changeTodoIsDone = (id: number) => {
    return {
        type: Types.CHANGE_TODO_IS_DONE,
        payload: {
            id,
        },
    };
};

export const changeTodoDate = (id: number, date: Date) => {
    return {
        type: Types.CHANGE_TODO_DATE,
        payload: {
            id,
            date,
        },
    };
};

export const changeTodoTime = (id: number, time: Date) => {
    return {
        type: Types.CHANGE_TODO_TIME,
        payload: {
            id,
            time,
        },
    };
};

export const sortTodos = (isAsc: boolean, isDone: boolean) => {
    return {
        type: Types.SORT_TODOS,
        payload: {
            isAsc,
            isDone,
        },
    };
};

export const filterTodos = (state: any) => {
    return {
        type: Types.FILTER_TODOS,
        payload: {
            state,
        },
    };
};

export const addNewTodo = (todo: Todo) => {
    return {
        type: Types.ADD_NEW_TASK,
        payload: {
            todo,
        },
    };
};

export const setAlert = (
    color: AlertColor,
    message: string,
    type: AlertType
) => {
    return {
        type: Types.SET_ALERT,
        payload: {
            color,
            message,
            type,
        },
    };
};
