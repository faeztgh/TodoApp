import React, { FC } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import MyDatePicker from "../../date-picker/MyDatePicker";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import MyTimePicker from "../../date-picker/MyTimePicker";

interface TodosProps {
    todos: Array<Todo>;
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

const Todos: FC<TodosProps> = (props) => {
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
            <table className="w-1/6 divide-y divide-gray-200 table-auto xl:w-full lg:w-full">
                <thead className="bg-white border-t ">
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
                                        className="w-4 h-4 mt-2 form-checkbox"
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
                                        className="text-cornFlowerBlue cornFlowerBlue_light focus:outline-none"
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
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Todos;
