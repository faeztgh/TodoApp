import moment from "moment";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import { Data } from "./data/data";

const DoneTasksContainer = lazy(() => import("./components/routes/DoneTasks"));
const TodosContainer = lazy(() => import("./components/routes/Todos"));
const Error = lazy(() => import("./components/routes/Error"));
const Alert = lazy(() => import("./components/Alert"));
const Tabs = lazy(() => import("./components/Tabs"));

function App() {
    const [todos, setTodos] = useState<Todo[]>(Data);
    const [unDoneTodos, setUnDoneTodos] = useState<Todo[]>([]);
    const [doneTodos, setDoneTodos] = useState<Todo[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("");
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
                        color: "success",
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
        setAlertDetails({
            color: "info",
            type: "Info",
            message: "Todo Added Successfully!",
        });
        handleAlert();
    };

    const handleRemoveTodo: HandleRemoveTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));

        setAlertDetails({
            color: "warning",
            type: "Warning",
            message: "Todo Removed!",
        });
        handleAlert();
    };

    const handleSort: HandleSort = (isAsc, isDone) => {
        const sorted = () => {
            if (isAsc) {
                if (!isDone) {
                    return unDoneTodos.sort((a, b) =>
                        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
                    );
                } else {
                    return doneTodos.sort((a, b) =>
                        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
                    );
                }
            } else {
                if (isDone) {
                    return doneTodos.sort((a, b) =>
                        a.title < b.title ? 1 : b.title < a.title ? -1 : 0
                    );
                } else {
                    return unDoneTodos.sort((a, b) =>
                        a.title < b.title ? 1 : b.title < a.title ? -1 : 0
                    );
                }
            }
        };

        isDone ? setDoneTodos(sorted) : setUnDoneTodos(sorted);
    };

    const handleFilter: HandleFilter = (state) => {
        setSelectedFilter(state);
        const now = moment();
        let filteredTodos: Todo[] = [];
        todos.forEach((todo) => {
            if (moment(todo.date).diff(now, state) === 0) {
                filteredTodos = [...filteredTodos, todo];
            }
        });
        setDoneTodos(filteredTodos.filter((todo) => todo.isDone));
        setUnDoneTodos(filteredTodos.filter((todo) => !todo.isDone));
    };

    return (
        <>
            <div className="m-2.5 lg:m-32 md:m-20">
                <Suspense fallback={<Loading count={todos.length} />}>
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
                                <TodosContainer
                                    todos={unDoneTodos}
                                    handleEditTitle={handleEditTitle}
                                    handleStatusChange={handleStatusChange}
                                    handleRemoveTodo={handleRemoveTodo}
                                    handleDateChange={handleDateChange}
                                    handleTimeChange={handleTimeChange}
                                    handleSort={handleSort}
                                    handleIsDone={handleIsDone}
                                    handleFilter={handleFilter}
                                    selectedFilter={selectedFilter}
                                />
                            )}
                        />

                        <Route
                            path="/donetasks"
                            component={() => (
                                <DoneTasksContainer
                                    todos={doneTodos}
                                    handleSort={handleSort}
                                    handleIsDone={handleIsDone}
                                />
                            )}
                        />
                        <Route path="/*" component={() => <Error />} />
                    </Switch>
                </Suspense>
            </div>
        </>
    );
}

export default App;
