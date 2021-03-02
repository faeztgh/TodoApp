import React, { FC } from "react";
import AddTaskButton from "./buttons/AddTaskButton";
import Modal from "./Modal";

interface AddTaskProps {
    showModal: boolean;
    setShowModal: SetShowModal;
}

const AddTask: FC<AddTaskProps> = (props) => {
    const { setShowModal, showModal } = props;

    return (
        <>
            <AddTaskButton setShowModal={setShowModal} showModal={showModal} />
            <Modal setShowModal={setShowModal} showModal={showModal} />
        </>
    );
};

export default AddTask;
