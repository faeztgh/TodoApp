import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Alert from "./components/Alert";
import DoneTasks from "./components/routes/DoneTasks";
import Todos from "./components/routes/Todos";
import Tabs from "./components/Tabs";
import { Data } from "./data/data";

function App() {
    const [todos, setTodos] = useState<Todo[]>(Data);
    const [unDoneTodos, setUnDoneTodos] = useState<Todo[]>([]);
    const [doneTodos, setDoneTodos] = useState<Todo[]>([]);
    const [showAlert, setShowAlert] = useState(true);
    const [alertDetails, setAlertDetails] = useState<AlertDetails>({
        color: "",
        message: "",
        type: "",
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // initial each of these statce anytime todo changed

        setUnDoneTodos(todos.filter((todo) => !todo.isDone));
        setDoneTodos(todos.filter((todo) => todo.isDone));
    }, [todos]);

    const handleStatusChange: HandleStatusChange = (id) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isPaused: !todo.isPaused,
                };
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const handleIsDone: HandleIsDone = (id) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isDone: !todo.isDone,
                };
            }
            return todo;
        });

        setTodos(newTodos);
    };

    const handleEditTitle: HandleEditTitle = (newTitle, id) => {
        const editedTodos = todos.map((todo) => {
            if (todo.id === id) {
                if (todo.title !== newTitle) {
                    setAlertDetails({
                        color: "green",
                        type: "Success",
                        message: "Todo title changed successfully!",
                    });
                    // showing alert for 5 second
                    handleAlert();

                    return {
                        ...todo,
                        title: newTitle,
                    };
                }
            }
            return todo;
        });
        setTodos(editedTodos);
    };

    const handleDateChange: HandleDateChange = (id, date) => {
        const editedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    date: date,
                };
            }
            return todo;
        });
        setTodos(editedTodos);
    };

    const handleAlert: HandleAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };

    const handleTimeChange: HandleTimeChange = (id, time) => {
        const editedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    time: time,
                };
            }
            return todo;
        });
        setTodos(editedTodos);
    };
    const handleAddNewTask: HandleAddNewTask = (task) => {
        // specify the new task id
        const id = todos.length === 0 ? 0 : todos[todos.length - 1].id + 1;
        task = { id: id, ...task };
        setTodos([...todos, task]);
        console.log(task);
    };

    const handleRemoveTodo: HandleRemoveTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));

        setAlertDetails({
            color: "blue",
            type: "Info",
            message: "Todo Removed Successfully!",
        });
        // showing alert for 5 second
        handleAlert();
    };

    return (
        <>
            <div className="m-16 lg:m-32 md:m-20">
                <Tabs
                    handleAddNewTask={handleAddNewTask}
                    setShowModal={setShowModal}
                    showModal={showModal}
                />

                {showAlert && (
                    <Alert
                        color={alertDetails.color}
                        message={alertDetails.message}
                        type={alertDetails.type}
                        handleAlert={handleAlert}
                    />
                )}

                <Switch>
                    <Route
                        path="/"
                        exact
                        component={() => (
                            <Todos
                                todos={unDoneTodos}
                                handleStatusChange={handleStatusChange}
                                handleIsDone={handleIsDone}
                                handleDateChange={handleDateChange}
                                handleEditTitle={handleEditTitle}
                                handleTimeChange={handleTimeChange}
                                handleRemoveTodo={handleRemoveTodo}
                            />
                        )}
                    />

                    <Route
                        path="/donetasks"
                        component={() => (
                            <DoneTasks
                                todos={doneTodos}
                                handleIsDone={handleIsDone}
                            />
                        )}
                    />
                </Switch>
            </div>
        </>
    );
}

export default App;
