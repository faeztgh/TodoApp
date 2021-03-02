import React, { FC, useRef, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgPlayListCheck } from "react-icons/cg";
import { MdTitle } from "react-icons/md";
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
        dispatch(setAlert("info", "Task added successfully!", "info"));
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
                                        <span className="absolute z-10 items-center justify-center pt-2.5 pl-2 text-base font-normal leading-snug text-center text-gray-400 bg-transparent rounded top-14">
                                            <MdTitle size="1.5em" />
                                        </span>
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
                                            className="relative w-5/6 px-1 py-2 pl-10 text-base text-gray-500 placeholder-gray-400 bg-gray-100 rounded shadow outline-none sm:w-full sm:text-lg focus:bg-white focus:outline-none focus:shadow-lg"
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
                                        className="px-2 py-2 mb-1 mr-1 text-sm font-bold uppercase outline-none focus:border-transparent sm:px-6 text-carnationRed background-transparent focus:outline-none"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className={`sm:px-6 px-2  py-3 whitespace-nowrap mb-1 mr-1 text-sm font-bold text-white uppercase rounded shadow outline-none bg-cornFlowerBlue hover:bg-cornFlowerBlue_light active:bg-green-600 hover:shadow-lg focus:outline-none ${
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
                                        Save Changes
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

export default Modal;
