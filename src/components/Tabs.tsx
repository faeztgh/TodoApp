import React, { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../redux/reducers/AllReducers";
import AddTask from "./AddTask";
import Alert from "../components/Alert";

const Tabs: FC = () => {
    const [openTab, setOpenTab] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const location = useLocation();

    const setCurrTab = useCallback(() => {
        if (location.pathname === "/donetasks") {
            setOpenTab(2);
        }
    }, [location.pathname]);

    useEffect(() => {
        setCurrTab();
    }, [setCurrTab]);

    const active = "text-ribbonBlue bg-white text-blue-dark";
    const deActive = "text-gray-400 bg-gray-100";

    // Alert
    const alert = useSelector((state: RootState) => state.alert);
    const [showAlert, setShowAlert] = useState(false);

    const handleShowAlert = useCallback(() => {
        if (alert.message !== "") {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    }, [alert]);

    useEffect(() => {
        handleShowAlert();
        return () => {
            setShowAlert(false);
        };
    }, [handleShowAlert]);

    const closeAlert = () => {
        setShowAlert(false);
    };
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

            {showAlert && (
                <Alert
                    color={alert.color}
                    message={alert.message}
                    type={alert.type}
                    closeAlert={closeAlert}
                />
            )}
        </>
    );
};

export default Tabs;
