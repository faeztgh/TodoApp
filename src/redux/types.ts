export const CHANGE_TODO_IS_DONE = "CHANGE_TODO_IS_DONE";
export const CHANGE_TODO_STATUS = "CHANGE_TODO_STATUS";
export const CHANGE_TODO_DATE = "CHANGE_TODO_DATE";
export const CHANGE_TODO_TIME = "CHANGE_TODO_TIME";
export const EDIT_TODO_TITLE = "EDIT_TASK_TITLE";
export const FILTER_TODOS = "FILTER_TODOS";
export const ADD_NEW_TASK = "ADD_NEW_TASK";
export const REMOVE_TODO = "REMOVE_TODO";
export const SORT_TODOS = "SORT_TODOS";
export const SET_ALERT = "SET_ALERT";

interface EditTaskTitle {
    type: typeof EDIT_TODO_TITLE;
    payload: {
        id: number;
        title: string;
    };
}

interface RemoveTodo {
    type: typeof REMOVE_TODO;
    payload: { id: number };
}

interface ChangeTodoStatus {
    type: typeof CHANGE_TODO_STATUS;
    payload: { id: number };
}

interface ChangeTodoIsDone {
    type: typeof CHANGE_TODO_IS_DONE;
    payload: { id: number };
}

interface ChangeTodoDate {
    type: typeof CHANGE_TODO_DATE;
    payload: { id: number; date: Date };
}

interface ChangeTodoTime {
    type: typeof CHANGE_TODO_TIME;
    payload: { id: number; time: Date };
}

interface SortTodos {
    type: typeof SORT_TODOS;
    payload: { isAsc: boolean; isDone: boolean };
}

interface FilterTodos {
    type: typeof FILTER_TODOS;
    payload: { state: any };
}

interface AddNewTask {
    type: typeof ADD_NEW_TASK;
    payload: { todo: Todo };
}

interface SetAlert {
    type: typeof SET_ALERT;
    payload: {
        color: AlertColor;
        message: string;
        type: AlertType;
    };
}

export type TodoAction =
    | EditTaskTitle
    | RemoveTodo
    | ChangeTodoStatus
    | ChangeTodoIsDone
    | ChangeTodoDate
    | ChangeTodoTime
    | SortTodos
    | FilterTodos
    | AddNewTask;

export type AlertAction = SetAlert;
