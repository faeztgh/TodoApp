import React, { FC, lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTodoIsDone, sortTodos } from "../../../redux/actions/Actions";

const DoneTasks = lazy(() => import("./DoneTasks"));
const MobileDoneTasks = lazy(() => import("./MobileDoneTasks"));

interface DoneTasksContainerProps {
    todos: Todo[];
    isMobile:boolean
}
const DoneTasksContainer: FC<DoneTasksContainerProps> = (props) => {
    const { todos, isMobile } = props;
    //states
    const [isAsc, setIsAsc] = useState(false);
    // get todos
    const doneTasks = todos.filter((todo) => todo.isDone && todo.isVisible);

    const dispatch = useDispatch();

   

    // sort
    const sort = () => {
        setIsAsc(!isAsc);
        handleSort(isAsc, true);
    };

    const handleSort: HandleSort = (isAsc, isDone) => {
        dispatch(sortTodos(isAsc, isDone));
    };

    // is done
    const handleIsDone: HandleIsDone = (id) => {
        dispatch(changeTodoIsDone(id));
    };

    return (
        <>
            {isMobile ? (
                <MobileDoneTasks
                    handleIsDone={handleIsDone}
                    todos={doneTasks}
                    sort={sort}
                    isAsc={isAsc}
                />
            ) : (
                <DoneTasks
                    handleIsDone={handleIsDone}
                    todos={doneTasks}
                    sort={sort}
                    isAsc={isAsc}
                />
            )}
        </>
    );
};

export default DoneTasksContainer;
