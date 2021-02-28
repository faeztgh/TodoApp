import React, { FC, lazy, useEffect, useRef, useState } from "react";
interface TodosContainerProps {
    todos: Array<Todo>;
    handleEditTitle: HandleEditTitle;
    handleStatusChange: HandleStatusChange;
    handleRemoveTodo: HandleRemoveTodo;
    handleDateChange: HandleDateChange;
    handleTimeChange: HandleTimeChange;
    handleSort: HandleSort;
    handleIsDone: HandleIsDone;
    handleFilter: HandleFilter;
    selectedFilter: string;
}

const MobileTodos = lazy(() => import("./MobileTodos"));
const Todos = lazy(() => import("./Todos"));

const TodosContainer: FC<TodosContainerProps> = (props) => {
    const {
        todos,
        handleEditTitle,
        handleDateChange,
        handleRemoveTodo,
        handleStatusChange,
        handleTimeChange,
        handleSort,
        handleIsDone,
        handleFilter,
        selectedFilter,
    } = props;

    const [isMobile, setIsMobile] = useState<boolean>();
    const [isAsc, setIsAsc] = useState(false);
    const taskTitleRefs = useRef<HTMLInputElement[]>([]);
    taskTitleRefs.current = [];

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

    const handleAddRefsToTaskTitleRefs = (input: HTMLInputElement) => {
        if (input && !taskTitleRefs.current.includes(input)) {
            taskTitleRefs.current.push(input);
        }
    };

    const handleClickOnEdit = (title: string) => {
        taskTitleRefs.current.forEach((el: HTMLInputElement) => {
            if (el.value === title) {
                el.focus();
            }
        });
    };

    const sort = () => {
        setIsAsc(!isAsc);
        handleSort(isAsc, false);
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
                    selectedFilter={selectedFilter}
                    handleIsDone={handleIsDone}
                    handleFilter={handleFilter}
                    todos={todos}
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
                    selectedFilter={selectedFilter}
                    handleIsDone={handleIsDone}
                    handleFilter={handleFilter}
                    todos={todos}
                    isAsc={isAsc}
                    sort={sort}
                />
            )}
        </>
    );
};

export default TodosContainer;
