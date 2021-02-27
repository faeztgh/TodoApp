type Todo = {
    id: number;
    title: string;
    isPaused: boolean;
    isDone: boolean;
    date: Date;
    time: Date;
};

type HandleEditTitle = (title: string, todoId: number) => void;

type HandleSort = (isAsc: boolean, isDone: boolean) => void;

type HandleDateChange = (id: number, date: Date) => void;

type HandleTimeChange = (id: number, date: Date) => void;

type HandleStatusChange = (id: number) => void;

type HandleRemoveTodo = (id: number) => void;

type HandleIsDone = (id: number) => void;

type HandleFilter = (state) => void;
