type Todo = {
    id: number;
    title: string;
    isPaused: boolean;
    isDone: boolean;
    date: Date;
    time: Date;
};

type HandleStatusChange = (id: number) => void;

type HandleIsDone = (id: number) => void;
type HandleAddNewTask = (todo) => void;
