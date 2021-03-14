import React, { FC } from "react";
import { BsPlus } from "react-icons/bs";

interface AddTaskButtonProps {
    showModal: boolean;
    setShowModal: SetShowModal;
}
const AddTaskButton: FC<AddTaskButtonProps> = (props) => {
    const { setShowModal, showModal } = props;
    return (
        <>
            <button
                aria-label="add task"
                className="addTask-btn"
                onClick={() => setShowModal(!showModal)}
            >
                <BsPlus size="1.5em" />
                Add Task
            </button>
        </>
    );
};

export default AddTaskButton;
