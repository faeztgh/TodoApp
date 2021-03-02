type Todo = {
    id: number;
    title: string;
    isPaused: boolean;
    isDone: boolean;
    date: Date;
    time: Date;
};

type InitialState = {
    todos: Todo[];
    doneTodos: Todo[];
    unDoneTodos: Todo[];
};

type handleAddRefsToTaskTitleRefs = (input: HTMLInputElement) => void;

type AlertDetails = { color: AlertColor; type: string; message: string };

type AlertType = "success" | "warning" | "info" | "danger" | "Error" | "";

type AlertColor = "success" | "warning" | "info" | "danger" | "";

type HandleEditTitle = (title: string, todoId: number) => void;

type HandleSort = (isAsc: boolean, isDone: boolean) => void;

type HandleDateChange = (id: number, date: Date) => void;

type HandleTimeChange = (id: number, date: Date) => void;

type HandleClickOnEdit = (title: string) => void;

type EditTitleSetValue = (value: string) => void;

type HandleStatusChange = (id: number) => void;

type SetShowModal = (isOpen: boolean) => void;

type HandleRemoveTodo = (id: number) => void;

type HandleIsDone = (id: number) => void;

type HandleAddNewTask = (todo) => void;

type HandleFilter = (state: any) => void;

type CloseAlert = () => void;

type Sort = () => void;
