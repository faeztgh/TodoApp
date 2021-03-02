import React, { FC, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTodoIsDone, sortTodos } from "../../../redux/actions/Actions";
import { RootState } from "../../../redux/reducers/AllReducers";

const DoneTasks = lazy(() => import("./DoneTasks"));
const MobileDoneTasks = lazy(() => import("./MobileDoneTasks"));

const DoneTasksContainer: FC = () => {
    const [isAsc, setIsAsc] = useState(false);
    let todos: Todo[] = useSelector((state: RootState) => state.todos);
    todos = todos.filter((todo) => todo.isDone);

    const [isMobile, setIsMobile] = useState<boolean>();
    const dispatch = useDispatch();

    const handleIsMobile = () => {
        if (window.innerWidth < 640) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };
    useEffect(() => {
        handleIsMobile();
        window.addEventListener("resize", handleIsMobile);
        window.addEventListener("load", handleIsMobile);
        return () => {
            window.removeEventListener("resize", handleIsMobile);
            window.removeEventListener("load", handleIsMobile);
        };
    }, []);

    const sort = () => {
        setIsAsc(!isAsc);
        handleSort(isAsc, true);
    };

    const handleSort: HandleSort = (isAsc, isDone) => {
        dispatch(sortTodos(isAsc, isDone));
    };

    const handleIsDone: HandleIsDone = (id) => {
        dispatch(changeTodoIsDone(id));
    };

    return (
        <>
            {isMobile ? (
                <MobileDoneTasks
                    handleIsDone={handleIsDone}
                    todos={todos}
                    sort={sort}
                    isAsc={isAsc}
                />
            ) : (
                <DoneTasks
                    handleIsDone={handleIsDone}
                    todos={todos}
                    sort={sort}
                    isAsc={isAsc}
                />
            )}
        </>
    );
};

export default DoneTasksContainer;
