import React, { FC } from "react";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface AlertProps {
    color: string;
    type: string;
    message: string;
    closeAlert: CloseAlert;
}

const Alert: FC<AlertProps> = (props) => {
    const { color = "info", type, message, closeAlert } = props;

    return (
        <>
            <div className={`alert-container bg-${color}`}>
                <span className="flex mr-1 text-base align-middle sm:text-xl">
                    <FaRegBell className="mt-1" />
                    <span className="font-semibold uppercase pl-">{type}!</span>
                </span>
                <span className="inline-block mr-3 capitalize align-middle">
                    <span>{message}</span>
                </span>
                <button
                    className="inline-block mr-1 text-xl align-middle focus:border-transparent"
                    onClick={closeAlert}
                >
                    <AiOutlineCloseCircle />
                </button>
            </div>

            <div
                hidden
                className="hidden bg-success bg-info bg-danger bg-warning"
            ></div>
        </>
    );
};

export default Alert;
