import React, { FC } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import MyDatePicker from "../../MyDatePicker";
import MyTimePicker from "../../MyTimePicker";

interface MobileDoneTasksProps {
    todos: Todo[];
    handleIsDone: HandleIsDone;
    sort: Sort;
    isAsc: boolean;
}
const MobileDoneTasks: FC<MobileDoneTasksProps> = (props) => {
    const { todos, handleIsDone, sort, isAsc } = props;
    return (
        <>
            <div className="container mt-10">
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
                                    <th className="p-3 text-left text-gray-900">
                                        Tasks
                                    </th>

                                    <th className="p-3 text-left text-gray-900">
                                        Date
                                    </th>

                                    <th className="p-3 text-left text-gray-900">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="flex-1 bg-white sm:flex-none">
                                <tr className="flex flex-col h-full flex-nowrap sm:table-row sm:mb-0">
                                    <td className="p-2 font-normal text-gray-400 whitespace-pre-wrap border-b border-l">
                                        <input
                                            className="w-3.5 h-3.5 mr-2 align-middle"
                                            type="checkbox"
                                            defaultChecked={todo.isDone}
                                            onChange={() =>
                                                handleIsDone(todo.id)
                                            }
                                        />
                                        {todo.title}
                                    </td>

                                    <td className="p-3 pl-0 text-sm font-normal text-gray-400 border-b border-l">
                                        <MyDatePicker
                                            todo={todo}
                                            disabled={true}
                                        />
                                    </td>
                                    <td className="p-3 pl-0 text-sm font-normal text-gray-400 border-l">
                                        <MyTimePicker
                                            todo={todo}
                                            disabled={true}
                                        />
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

export default MobileDoneTasks;
