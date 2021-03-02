import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FilterGroupButton from "./components/buttons/FilterGroupButton";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { RootState } from "./redux/reducers/AllReducers";
import { useDispatch, useSelector } from "react-redux";
import { filterTodos } from "./redux/actions";
import Loading from "./components/Loading";
import Alert from "./components/Alert";

const DoneTasksContainer = lazy(() => import("./components/routes/DoneTasks"));
const TodosContainer = lazy(() => import("./components/routes/Todos"));
const Error = lazy(() => import("./components/routes/Error"));
const Tabs = lazy(() => import("./components/Tabs"));

function App() {
    const todos: Todo[] = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();

    // Alert
    const alert = useSelector((state: RootState) => state.alert);
    const [showAlert, setShowAlert] = useState(false);
    const handleShowAlert = () => {
        if (alert.message !== "") {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        }
    };

    useEffect(() => {
        handleShowAlert();

        return () => {
            setShowAlert(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alert]);

    const closeAlert = () => {
        setShowAlert(false);
    };

    // filter
    const [selectedFilter, setSelectedFilter] = useState("");
    const handleFilter: HandleFilter = (state) => {
        setSelectedFilter(state);
        dispatch(filterTodos(state));
    };

    return (
        <>
            <Router>
                <div className="m-2.5 lg:m-32 md:m-20">
                    <Suspense fallback={<Loading count={todos.length} />}>
                        <Tabs />
                        <div className="flex py-7" dir="rtl">
                            <FilterGroupButton
                                handleFilter={handleFilter}
                                selectedFilter={selectedFilter}
                            />
                        </div>
                        <Switch>
                            <Route
                                path="/"
                                exact
                                component={() => <TodosContainer />}
                            />
                            <Route
                                path="/donetasks"
                                component={() => <DoneTasksContainer />}
                            />
                            <Route path="/*" component={() => <Error />} />
                        </Switch>

                        {showAlert && (
                            <Alert
                                color={alert.color}
                                message={alert.message}
                                type={alert.type}
                                closeAlert={closeAlert}
                            />
                        )}
                    </Suspense>
                </div>
            </Router>
        </>
    );
}

export default App;
