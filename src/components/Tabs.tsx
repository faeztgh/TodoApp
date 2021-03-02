import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import AddTask from "./AddTask";

const Tabs: FC = () => {
    const [openTab, setOpenTab] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const active = "text-ribbonBlue bg-white text-blue-dark";
    const deActive = "text-gray-400 bg-gray-100";

    return (
        <>
            <ul className="flex border-b list-reset">
                <li
                    className={`tabs-listItem
                        ${openTab === 1 ? active : deActive}`}
                >
                    <Link
                        to="/"
                        className={
                            "inline-block px-4 py-2 font-semibold bg-white " +
                            (openTab === 1 ? active : deActive)
                        }
                        onClick={() => {
                            setOpenTab(1);
                        }}
                    >
                        ToDo
                    </Link>
                </li>
                <li
                    className={`tabs-listItem
                        ${openTab === 2 ? active : deActive}`}
                >
                    <Link
                        to="/donetasks"
                        className={
                            "inline-block px-4 py-2 font-semibold bg-white" +
                            (openTab === 2 ? active : deActive)
                        }
                        onClick={() => {
                            setOpenTab(2);
                        }}
                    >
                        Done Tasks
                    </Link>
                </li>
                <li className="flex mb-2 ml-auto">
                    <AddTask
                        setShowModal={setShowModal}
                        showModal={showModal}
                    />
                </li>
            </ul>
        </>
    );
};

export default Tabs;
