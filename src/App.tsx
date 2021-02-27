import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Todos from "./components/routes/Todos";
import Tabs from "./components/Tabs";
import { Data } from "./data/data";

function App() {
    const [todos, setTodos] = useState<Todo[]>(Data);
    const [unDoneTodos, setUnDoneTodos] = useState<Todo[]>([]);

    useEffect(() => {
        setUnDoneTodos(todos.filter((todo) => !todo.isDone));
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

    return (
        <>
            <div className="m-16 lg:m-32 md:m-20">
                <Tabs />
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
                            />
                        )}
                    />
                </Switch>
            </div>
        </>
    );
}

export default App;
