import { TodoItem } from "./TodoItem";

export default interface TodoActions {
    loadTodos(): TodoItem[];
    loadById(id: string): TodoItem;
    createTodo(content: string): TodoItem;
    closeTodoByID(id: string): void;
    updateContentByID(id: string, content: string): void;
    deleteTodoByID(id: string): void;
}
