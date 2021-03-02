import React, { FC, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTodoIsDone, sortTodos } from "../../../redux/actions/Actions";
import { RootState } from "../../../redux/reducers/AllReducers";

const DoneTasks = lazy(() => import("./DoneTasks"));
const MobileDoneTasks = lazy(() => import("./MobileDoneTasks"));

const DoneTasksContainer: FC = () => {
    //states
    const [isAsc, setIsAsc] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean>();
    // get todos
    let todos: Todo[] = useSelector((state: RootState) => state.todos);
    todos = todos.filter((todo) => todo.isDone);

    const dispatch = useDispatch();

    // handle mobile view
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
