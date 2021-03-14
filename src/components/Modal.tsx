import React, { FC, memo, useRef, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgPlayListCheck } from "react-icons/cg";
import { BsCalendar } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { addNewTodo, setAlert } from "../redux/actions/Actions";
import { useDispatch } from "react-redux";

interface ModalProps {
    showModal: boolean;
    setShowModal: SetShowModal;
}

const Modal: FC<ModalProps> = (props) => {
    const { showModal, setShowModal } = props;

    const dispatch = useDispatch();

    const [taskTitleInput, setTaskTitleInput] = useState("");
    const [chosenDate, setChosenDate] = useState<Date>(new Date());
    const [chosenTime, setChosenTime] = useState<Date>(new Date());

    const taskStatus = useRef<HTMLSelectElement>(null);

    const handleNewTask = () => {
        const newTask = {
            title: taskTitleInput,
            isPaused: taskStatus.current?.value === "true" ? true : false,
            isDone: false,
            isVisible: true,
            date: chosenDate,
            time: chosenTime,
        };

        if (taskTitleInput.trim() !== "") {
            handleAddNewTask(newTask);
            setShowModal(false);
        }
        setTaskTitleInput("");
    };

    const handleAddDate = (date: Date) => {
        setChosenDate(date);
    };

    const handleAddTime = (time: Date) => {
        setChosenTime(time);
    };

    const handleAddNewTask: HandleAddNewTask = (task) => {
        dispatch(addNewTodo(task));
        dispatch(setAlert("success", "Task added successfully!", "success"));
    };

    return (
        <>
            {showModal && (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
                        <div className="relative w-5/6 mx-auto my-6 sm:w-auto">
                            <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg outline-none sm:w-96 focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-gray-300 border-solid rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        Add New Task
                                    </h3>
                                </div>
                                <div className="relative items-stretch flex-auto w-full px-3 py-6 mx-auto my-4 mb-3 sm:p-6">
                                    <div>
                                        <label
                                            htmlFor="newTaskInput"
                                            className="flex mb-1 text-lg font-semibold text-gray-600 capitalize"
                                        >
                                            <IoMdAddCircleOutline
                                                size="1.4em"
                                                className="mr-1 text-ribbonBlue"
                                            />
                                            New Task
                                        </label>
                                        <input
                                            className="modal-newTask-input"
                                            type="text"
                                            placeholder="Add New Task"
                                            id="newTaskInput"
                                            onChange={(e) =>
                                                setTaskTitleInput(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="mt-10">
                                        <label
                                            htmlFor="taskStatus"
                                            className="flex mb-1 text-lg font-semibold text-gray-600 capitalize"
                                        >
                                            <CgPlayListCheck
                                                size="1.4em"
                                                className="mr-1 text-ribbonBlue"
                                            />
                                            Task Status
                                        </label>
                                        <select
                                            id="taskStatus"
                                            ref={taskStatus}
                                            className="w-6/12 px-1 py-2 text-gray-600 bg-gray-100 rounded shadow focus:outline-none focus:bg-white"
                                        >
                                            <option value="true">Paused</option>
                                            <option value="false">
                                                In Progress
                                            </option>
                                        </select>
                                    </div>
                                    <div className="w-full mt-10">
                                        <label
                                            htmlFor="taskDate"
                                            className="flex mb-1 text-lg font-semibold text-gray-600 capitalize"
                                        >
                                            <BsCalendar
                                                size="1.2em"
                                                className="mr-1 text-ribbonBlue"
                                            />
                                            Task Date
                                        </label>
                                        <DatePicker
                                            id="taskDate"
                                            className="z-20 px-2 py-1 bg-gray-100 rounded shadow cursor-pointer focus:outline-none"
                                            selected={chosenDate}
                                            onChange={handleAddDate}
                                            dateFormat="d MMMM yyyy"
                                        />
                                    </div>
                                    <div className="w-full mt-10">
                                        <label
                                            htmlFor="taskTime"
                                            className="flex mb-1 text-lg font-semibold text-gray-600 capitalize"
                                        >
                                            <BiTime
                                                size="1.2em"
                                                className="mr-1 text-ribbonBlue"
                                            />
                                            Task Time
                                        </label>
                                        <DatePicker
                                            id="taskTime"
                                            className="z-20 px-2 py-1 bg-gray-100 rounded shadow cursor-pointer focus:outline-none"
                                            selected={chosenTime}
                                            onChange={handleAddTime}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end p-6 border-t border-gray-300 border-solid rounded-b">
                                    <button
                                        className="modal-close-btn"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className={`modal-addTask-btn ${
                                            taskTitleInput.trim() !== ""
                                                ? ""
                                                : "opacity-50"
                                        }`}
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={handleNewTask}
                                        disabled={
                                            taskTitleInput.trim() === ""
                                                ? true
                                                : false
                                        }
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            )}
        </>
    );
};

export default memo(Modal);
