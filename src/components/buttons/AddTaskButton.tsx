import React, { FC } from "react";
import { BsPlus } from "react-icons/bs";

interface AddTaskButtonProps {
    showModal: boolean;
    setShowModal: (isOpen: boolean) => void;
}
const AddTaskButton: FC<AddTaskButtonProps> = (props) => {
    const { setShowModal, showModal } = props;
    return (
        <>
            <button
                className="flex justify-around shadow-md px-2 py-1.5 ml-auto bg-cornFlowerBlue rounded text-gray-50 self-start"
                onClick={() => setShowModal(!showModal)}
            >
                <BsPlus size="1.5em" />
                Add Task
            </button>
        </>
    );
};

export default AddTaskButton;
