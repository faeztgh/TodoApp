import React, { FC } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import FilterGroupButton from "../../buttons/FilterGroupButton";
import MyDatePicker from "../../MyDatePicker";
import MyTimePicker from "../../MyTimePicker";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

interface TodosProps {
    todos: Todo[];
    selectedFilter: string;
    isAsc: boolean;
    handleEditTitle: HandleEditTitle;
    handleStatusChange: HandleStatusChange;
    handleRemoveTodo: HandleRemoveTodo;
    handleDateChange: HandleDateChange;
    handleTimeChange: HandleTimeChange;
    handleIsDone: HandleIsDone;
    handleFilter: HandleFilter;
    handleAddRefsToTaskTitleRefs: handleAddRefsToTaskTitleRefs;
    handleClickOnEdit: HandleClickOnEdit;
    sort: Sort;
}

const MobileTodos: FC<TodosProps> = (props) => {
    const {
        todos,
        handleAddRefsToTaskTitleRefs,
        handleClickOnEdit,
        handleEditTitle,
        handleDateChange,
        handleRemoveTodo,
        handleStatusChange,
        handleTimeChange,
        handleIsDone,
        handleFilter,
        sort,
        isAsc,
        selectedFilter,
    } = props;

    return (
        <>
            <div className="flex py-7" dir="rtl">
                <FilterGroupButton
                    handleFilter={handleFilter}
                    selectedFilter={selectedFilter}
                />
            </div>
            <div className="container">
                <button
                    className="px-3 py-1.5 shadow-md text-gray-800 bg-gray-200 rounded"
                    onClick={sort}
                >
                    <span className="flex font-semibold">
                        Sort
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
                </button>
                {todos.map((todo) => {
                    return (
                        <table
                            key={todo.id}
                            className="flex flex-no-wrap w-full my-5 overflow-hidden border-2 rounded-lg shadow-lg sm:bg-white sm:shadow-lg lg:flex-col"
                        >
                            <thead className="bg-gray-100">
                                <tr className="flex flex-col bg-gray-100 bg-teal-400 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0">
                                    <th className="p-3 text-left ">Tasks</th>

                                    <th className="p-4 text-left">Status</th>

                                    <th className="p-3 text-left">Date</th>

                                    <th className="p-3 text-left">Time</th>

                                    <th className="p-3 text-left">
                                        Operations
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="flex-1 bg-white sm:flex-none">
                                <tr className="flex flex-col h-full flex-nowrap sm:table-row sm:mb-0">
                                    <td className="p-2 text-sm border-b border-l whitespace-nowrap">
                                        <input
                                            className="w-3.5 h-3.5 mr-2 align-middle"
                                            type="checkbox"
                                            defaultChecked={todo.isDone}
                                            onChange={() =>
                                                handleIsDone(todo.id)
                                            }
                                        />
                                        <input
                                            className="w-5/6 px-2 py-1 font-semibold text-gray-800 align-middle md:w-min"
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
                                    <td className="p-2 border-b border-l ">
                                        <button
                                            className={`capitalize text-sm rounded-full px-3 py-1.5 text-gray-50 whitespace-nowrap shadow hover:shadow-lg
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
                                    <td className="p-3 pl-0 text-sm font-semibold border-b border-l">
                                        <MyDatePicker
                                            todo={todo}
                                            handleDateChange={handleDateChange}
                                        />
                                    </td>
                                    <td className="p-3 pl-0 text-sm font-semibold border-b border-l">
                                        <MyTimePicker
                                            todo={todo}
                                            handleTimeChange={handleTimeChange}
                                        />
                                    </td>
                                    <td className="flex p-2 border-l justify-evenly ">
                                        <button
                                            className="text-cornFlowerBlue focus:outline-none"
                                            onClick={() =>
                                                handleClickOnEdit(todo.title)
                                            }
                                        >
                                            <FaPencilAlt size="1.2em" />
                                        </button>
                                        <button
                                            className="text-carnationRed focus:outline-none"
                                            onClick={() =>
                                                handleRemoveTodo(todo.id)
                                            }
                                        >
                                            <MdClose size="1.6em" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    );
                })}
            </div>
        </>
    );
};

export default MobileTodos;
