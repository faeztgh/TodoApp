import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FilterGroupButton from "./components/buttons/FilterGroupButton";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { RootState } from "./redux/reducers/AllReducers";
import { useDispatch, useSelector } from "react-redux";
import { filterTodos } from "./redux/actions";
import Loading from "./components/Loading";

const DoneTasksContainer = lazy(() => import("./components/routes/DoneTasks"));
const TodosContainer = lazy(() => import("./components/routes/Todos"));
const Error = lazy(() => import("./components/routes/Error"));
const Tabs = lazy(() => import("./components/Tabs"));

function App() {
    const todos: Todo[] = useSelector((state: RootState) => state.todos);

    const dispatch = useDispatch();

    // filter
    const [selectedFilter, setSelectedFilter] = useState("");
    const handleFilter: HandleFilter = (state) => {
        if (selectedFilter !== state) {
            setSelectedFilter(state);
            dispatch(filterTodos(state));
        }
    };

    // handle is mobile
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const handleIsMobile = () => {
        if (window.innerWidth < 640) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        handleIsMobile();
        window.addEventListener("resize", handleIsMobile);
        window.addEventListener("load", handleIsMobile);
        // cleanup
        return () => {
            window.removeEventListener("resize", handleIsMobile);
            window.removeEventListener("load", handleIsMobile);
        };
    }, []);


    return (
        <>
            <Router>
                <div className="m-4 lg:m-32 xl:mx-80 md:m-20">
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
                                component={() => (
                                    <TodosContainer
                                        todos={todos}
                                        isMobile={isMobile}
                                    />
                                )}
                            />
                            <Route
                                path="/donetasks"
                                component={() => (
                                    <DoneTasksContainer
                                        todos={todos}
                                        isMobile={isMobile}
                                    />
                                )}
                            />
                            <Route path="/*" component={() => <Error />} />
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        </>
    );
}

export default App;
