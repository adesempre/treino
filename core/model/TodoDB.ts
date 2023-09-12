import { TodoItem } from "./TodoItem";
export interface TodoDB {
    lastTodoId: string;
    todos: TodoItem[];
}
