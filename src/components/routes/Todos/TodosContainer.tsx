import React, { FC, lazy, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
    changeTodoDate,
    changeTodoIsDone,
    changeTodoStatusAction,
    changeTodoTime,
    editTaskTitleAction,
    removeTodoAction,
    setAlert,
    sortTodos,
} from "../../../redux/actions/Actions";

const MobileTodos = lazy(() => import("./MobileTodos"));
const Todos = lazy(() => import("./Todos"));

interface TodosContainerProps {
    todos: Todo[];
    isMobile: boolean;
}

const TodosContainer: FC<TodosContainerProps> = (props) => {
    const { todos, isMobile } = props;
    const dispatch = useDispatch();

    //states
    const [isAsc, setIsAsc] = useState(false);

    //refs
    const taskTitleRefs = useRef<HTMLInputElement[]>([]);
    taskTitleRefs.current = [];

    //getting todos
    const undoneTodos = todos.filter(
        (todo: Todo) => !todo.isDone && todo.isVisible
    );

    // make array of titleRefs
    const handleAddRefsToTaskTitleRefs = (input: HTMLInputElement) => {
        if (input && !taskTitleRefs.current.includes(input)) {
            taskTitleRefs.current.push(input);
        }
    };

    // focus on title input
    const handleClickOnEdit = (title: string) => {
        taskTitleRefs.current.forEach((el: HTMLInputElement) => {
            if (el.value === title) {
                el.focus();
            }
        });
    };

    // sort
    const handleSort: HandleSort = (isAsc, isDone) => {
        dispatch(sortTodos(isAsc, isDone));
    };

    const sort = () => {
        setIsAsc(!isAsc);
        handleSort(isAsc, false);
    };
    //change time
    const handleTimeChange: HandleTimeChange = (id, time) => {
        dispatch(changeTodoTime(id, time));
        dispatch(setAlert("info", "Time changed!", "info"));
    };

    // change date
    const handleDateChange: HandleDateChange = (id, date) => {
        dispatch(changeTodoDate(id, date));
        dispatch(setAlert("info", "Date changed!", "info"));
    };

    // change isDone state
    const handleIsDone: HandleIsDone = (id) => {
        dispatch(changeTodoIsDone(id));
    };

    // change status
    const handleStatusChange: HandleStatusChange = (id) => {
        dispatch(changeTodoStatusAction(id));
    };

    // remove todo
    const handleRemoveTodo: HandleRemoveTodo = (id) => {
        dispatch(removeTodoAction(id));
        dispatch(setAlert("warning", "Todo removed!", "warning"));
    };

    // Edit title
    const handleEditTitle: HandleEditTitle = (newTitle, id) => {
        const todo = todos.find((todo) => todo.id === id);
        if (newTitle.trim() !== "") {
            if (todo?.title !== newTitle.trim()) {
                dispatch(editTaskTitleAction(id, newTitle));
                dispatch(
                    setAlert("success", "Title edited successfully!", "success")
                );
            }
        } else {
            dispatch(
                setAlert("danger", "You can't leave title empty!", "Error")
            );
        }
    };


    return (
        <>
            {isMobile ? (
                <MobileTodos
                    handleAddRefsToTaskTitleRefs={handleAddRefsToTaskTitleRefs}
                    handleStatusChange={handleStatusChange}
                    handleClickOnEdit={handleClickOnEdit}
                    handleRemoveTodo={handleRemoveTodo}
                    handleDateChange={handleDateChange}
                    handleTimeChange={handleTimeChange}
                    handleEditTitle={handleEditTitle}
                    handleIsDone={handleIsDone}
                    todos={undoneTodos}
                    isAsc={isAsc}
                    sort={sort}
                />
            ) : (
                <Todos
                    handleAddRefsToTaskTitleRefs={handleAddRefsToTaskTitleRefs}
                    handleStatusChange={handleStatusChange}
                    handleClickOnEdit={handleClickOnEdit}
                    handleRemoveTodo={handleRemoveTodo}
                    handleDateChange={handleDateChange}
                    handleTimeChange={handleTimeChange}
                    handleEditTitle={handleEditTitle}
                    handleIsDone={handleIsDone}
                    todos={undoneTodos}
                    isAsc={isAsc}
                    sort={sort}
                />
            )}
        </>
    );
};

export default TodosContainer;
