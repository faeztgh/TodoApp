import React, { FC, useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

import MyDatePicker from "../MyDatePicker";
import MyTimePicker from "../MyTimePicker";

interface DoneTasksProps {
    todos: Todo[];
    handleSort: HandleSort;
    handleIsDone: HandleIsDone;
}

const DoneTasks: FC<DoneTasksProps> = (props) => {
    const { todos, handleSort, handleIsDone } = props;

    const [isAsc, setIsAsc] = useState(false);

    const sort = () => {
        setIsAsc(!isAsc);
        handleSort(isAsc, true);
    };

    return (
        <>
            <table className="w-full mt-20 divide-y divide-gray-200">
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
                                        type="checkbox"
                                        defaultChecked={todo.isDone}
                                        onChange={() => handleIsDone(todo.id)}
                                    />
                                </td>
                                <td className="px-2 py-1 text-gray-400">
                                    {todo.title}
                                </td>

                                <td className="text-gray-400">
                                    <MyDatePicker todo={todo} disabled={true} />
                                </td>
                                <td className="text-gray-400">
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
