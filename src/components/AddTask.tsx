import React, { FC } from "react";
import AddTaskButton from "./buttons/AddTaskButton";
import Modal from "./Modal";

interface AddTaskProps {
    showModal: boolean;
    setShowModal: (isOpen: boolean) => void;
    handleAddNewTask: HandleAddNewTask;
}

const AddTask: FC<AddTaskProps> = (props) => {
    const { setShowModal, showModal, handleAddNewTask } = props;

    return (
        <>
            <AddTaskButton setShowModal={setShowModal} showModal={showModal} />
            <Modal
                setShowModal={setShowModal}
                showModal={showModal}
                handleAddNewTask={handleAddNewTask}
            />
        </>
    );
};

export default AddTask;
