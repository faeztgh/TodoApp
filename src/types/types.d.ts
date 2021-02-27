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
type HandleEditTitle = (title: string, todoId: number) => void;
type HandleDateChange = (id: number, date: Date) => void;

type HandleTimeChange = (id: number, date: Date) => void;
type AlertDetails = { color: string; type: string; message: string };
type HandleAlert = () => void;
type HandleAddNewTask = (todo) => void;
