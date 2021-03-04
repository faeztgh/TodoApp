import React, { FC, lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTodoIsDone, sortTodos } from "../../../redux/actions/Actions";

const DoneTasks = lazy(() => import("./DoneTasks"));
const MobileDoneTasks = lazy(() => import("./MobileDoneTasks"));

interface DoneTasksContainerProps {
    todos: Todo[];
}
const DoneTasksContainer: FC<DoneTasksContainerProps> = (props) => {
    const { todos } = props;
    //states
    const [isAsc, setIsAsc] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean>();
    // get todos
    const doneTasks = todos.filter((todo) => todo.isDone && todo.isVisible);

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
