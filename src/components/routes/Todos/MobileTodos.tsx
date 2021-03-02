import React, { FC } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import MyDatePicker from "../../date-picker/MyDatePicker";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import MyTimePicker from "../../date-picker/MyTimePicker";

interface TodosProps {
    todos: Todo[];
    isAsc: boolean;
    handleAddRefsToTaskTitleRefs: handleAddRefsToTaskTitleRefs;
    handleStatusChange: HandleStatusChange;
    handleClickOnEdit: HandleClickOnEdit;
    handleRemoveTodo: HandleRemoveTodo;
    handleDateChange: HandleDateChange;
    handleTimeChange: HandleTimeChange;
    handleEditTitle: HandleEditTitle;
    handleIsDone: HandleIsDone;
    sort: Sort;
}

const MobileTodos: FC<TodosProps> = (props) => {
    const {
        todos,
        isAsc,
        handleAddRefsToTaskTitleRefs,
        handleClickOnEdit,
        handleEditTitle,
        handleDateChange,
        handleRemoveTodo,
        handleStatusChange,
        handleTimeChange,
        handleIsDone,
        sort,
    } = props;

    return (
        <>
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
                            <thead className="bg-white">
                                <tr className="flex flex-col bg-gray-100 bg-teal-400 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0">
                                    <th className="p-3 text-left ">Tasks</th>

                                    <th className="px-3 py-4 text-left">
                                        Status
                                    </th>

                                    <th className="p-3 text-left">Date</th>

                                    <th className="p-3 text-left">Time</th>

                                    <th className="p-3 text-left">
                                        Operations
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="flex-1 bg-white sm:flex-none">
                                <tr className="flex flex-col h-full flex-nowrap sm:table-row sm:mb-0">
                                    <td className="p-2 text-sm border-b border-l ">
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
                                            className={`status-btn${
                                                todo.isPaused
                                                    ? "bg-webOrange hover:bg-webOrange_light"
                                                    : "bg-easternBlue hover:bg-easternBlue_light"
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
                                    <td className="p-3 text-sm font-semibold border-b border-l">
                                        <MyDatePicker
                                            todo={todo}
                                            handleDateChange={handleDateChange}
                                        />
                                    </td>
                                    <td className="p-3 text-sm font-semibold border-b border-l">
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
