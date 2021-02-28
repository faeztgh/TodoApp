import React, { FC } from "react";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface AlertProps {
    color: string;
    type: string;
    message: string;
    handleAlert?: HandleAlert;
}

const Alert: FC<AlertProps> = (props) => {
    const { color = "info", type, message, handleAlert } = props;
    return (
        <>
            <div
                className={`text-white sm:flex text-sm z-50 sm:text-lg sm:px-6 sm:py-2.5 px-2 py-2 shadow-2xl border-0 rounded fixed mb-4 bottom-0 right-5 bg-${color}`}
            >
                <span className="flex mr-1 text-base align-middle sm:text-xl">
                    <FaRegBell className="mt-1" />
                    <span className="pl-2 font-semibold uppercase">
                        {type}!
                    </span>
                </span>
                <span className="inline-block mr-3 capitalize align-middle">
                    <span>{message}</span>
                </span>
                <button
                    className="inline-block mr-1 text-xl align-middle focus:border-transparent"
                    onClick={handleAlert}
                >
                    <AiOutlineCloseCircle />
                </button>
            </div>
            <div className="hidden bg-success bg-info bg-danger bg-warning"></div>
        </>
    );
};

export default Alert;
