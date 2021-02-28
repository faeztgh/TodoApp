import React, { FC, lazy, useEffect, useState } from "react";

const DoneTasks = lazy(() => import("./DoneTasks"));
const MobileDoneTasks = lazy(() => import("./MobileDoneTasks"));

interface DoneTasksContainerProps {
    todos: Todo[];
    handleSort: HandleSort;
    handleIsDone: HandleIsDone;
}
const DoneTasksContainer: FC<DoneTasksContainerProps> = (props) => {
    const { todos, handleSort, handleIsDone } = props;

    const [isAsc, setIsAsc] = useState(false);

    const [isMobile, setIsMobile] = useState<boolean>();

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
