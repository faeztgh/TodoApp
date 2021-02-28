import React, { FC, useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import MyDatePicker from "../MyDatePicker";
import MyTimePicker from "../MyTimePicker";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import FilterGroupButton from "../buttons/FilterGroupButton";

interface TodosProps {
    todos: Array<Todo>;
    handleStatusChange: HandleStatusChange;
    handleEditTitle: HandleEditTitle;
    handleDateChange: HandleDateChange;
    handleTimeChange: HandleTimeChange;
    handleRemoveTodo: HandleRemoveTodo;
    handleSort: HandleSort;
    handleIsDone: HandleIsDone;
    handleFilter: HandleFilter;
    selectedFilter: string;
}
const Todos: FC<TodosProps> = (props) => {
    const {
        todos,
        handleStatusChange,
        handleIsDone,
        handleEditTitle,
        handleDateChange,
        handleTimeChange,
        handleRemoveTodo,
        handleSort,
        handleFilter,
        selectedFilter,
    } = props;

    const taskTitleRefs = useRef<HTMLInputElement[]>([]);
    taskTitleRefs.current = [];

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

    const [isAsc, setIsAsc] = useState(false);

    const sort = () => {
        setIsAsc(!isAsc);
        handleSort(isAsc, false);
    };

    return (
        <>
            <div className="flex py-7" dir="rtl">
                <FilterGroupButton
                    handleFilter={handleFilter}
                    selectedFilter={selectedFilter}
                />
            </div>
            <table className="w-1/6 divide-y divide-gray-200 table-auto xl:w-full lg:w-full">
                <thead className="bg-white border-t">
                    <tr>
                        <th></th>

                        <th className="cursor-pointer" onClick={sort}>
                            <span className="flex px-3 py-1 font-semibold">
                                Tasks
                                {isAsc ? (
                                    <BiDownArrow
                                        className="mt-1 ml-2 text-gray-600"
                                        size="1em"
                                    />
                                ) : (
                                    <BiUpArrow
                                        className="mt-1 ml-2 text-gray-600"
                                        size="1em"
                                    />
                                )}
                            </span>
                        </th>

                        <th>Status</th>

                        <th>Date</th>

                        <th>Time</th>

                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {todos.map((todo) => {
                        return (
                            <tr key={todo.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        defaultChecked={todo.isDone}
                                        onChange={() => handleIsDone(todo.id)}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="w-5/6 px-2 py-1 font-semibold text-gray-800 md:w-min"
                                        type="text"
                                        ref={handleAddRefsToTaskTitleRefs}
                                        defaultValue={todo.title}
                                        onBlur={(e) =>
                                            handleEditTitle(
                                                e.target.value,
                                                todo.id
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        className={`capitalize rounded-full px-3 py-1.5 text-gray-50 whitespace-nowrap
                                           ${
                                               todo.isPaused
                                                   ? "bg-webOrange"
                                                   : "bg-easternBlue"
                                           }`}
                                        onClick={() =>
                                            handleStatusChange(todo.id)
                                        }
                                    >
                                        {todo.isPaused
                                            ? "paused"
                                            : "in progress"}
                                    </button>
                                </td>
                                <td>
                                    <MyDatePicker
                                        todo={todo}
                                        handleDateChange={handleDateChange}
                                    />
                                </td>
                                <td>
                                    <MyTimePicker
                                        todo={todo}
                                        handleTimeChange={handleTimeChange}
                                    />
                                </td>
                                <td className="flex justify-around">
                                    <button
                                        className="text-cornFlowerBlue"
                                        onClick={() =>
                                            handleClickOnEdit(todo.title)
                                        }
                                    >
                                        <FaPencilAlt size="1.2em" />
                                    </button>
                                    <button
                                        className="text-carnationRed"
                                        onClick={() =>
                                            handleRemoveTodo(todo.id)
                                        }
                                    >
                                        <MdClose size="1.6em" />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Todos;
