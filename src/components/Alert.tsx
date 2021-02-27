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
    const { color, type, message, handleAlert } = props;
    return (
        <>
            <div
                className={` text-white z-50 px-6 py-2.5 border-0 rounded fixed mb-4 bottom-0 right-5 bg-${color}-500`}
            >
                <span className="inline-block mr-1 text-xl align-middle">
                    <FaRegBell />
                </span>
                <span className="inline-block mr-8 capitalize align-middle">
                    <b className="uppercase">{type}!</b> {message}
                </span>
                <button
                    className="inline-block mr-1 text-xl align-middle focus:border-transparent"
                    onClick={handleAlert}
                >
                    <AiOutlineCloseCircle />
                </button>
            </div>
        </>
    );
};

export default Alert;
