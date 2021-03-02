import React, { FC } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

import MyDatePicker from "../../date-picker/MyDatePicker";
import MyTimePicker from "../../date-picker/MyTimePicker";

interface DoneTasksProps {
    todos: Todo[];
    handleIsDone: HandleIsDone;
    sort: Sort;
    isAsc: boolean;
}

const DoneTasks: FC<DoneTasksProps> = (props) => {
    const { todos, handleIsDone, sort, isAsc } = props;

    return (
        <>
            <table className="w-5/6 m-auto divide-y divide-gray-200">
                <thead className="bg-white border-t ">
                    <tr>
                        <th></th>

                        <th className="pl-0 cursor-pointer" onClick={sort}>
                            <span className="flex px-1 py-1 font-semibold">
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

                        <th>Date</th>

                        <th>Time</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                    {todos.map((todo) => {
                        return (
                            <tr key={todo.id}>
                                <td>
                                    <input
                                        className="w-4 h-4 mt-2 "
                                        type="checkbox"
                                        defaultChecked={todo.isDone}
                                        onChange={() => handleIsDone(todo.id)}
                                    />
                                </td>
                                <td className="py-1 font-normal text-gray-400 w-max sm:font-semibold">
                                    {todo.title}
                                </td>

                                <td className="pl-0 font-normal text-gray-400 w-max">
                                    <MyDatePicker todo={todo} disabled={true} />
                                </td>
                                <td className="pl-0 font-normal text-gray-400 w-max">
                                    <MyTimePicker todo={todo} disabled={true} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default DoneTasks;
