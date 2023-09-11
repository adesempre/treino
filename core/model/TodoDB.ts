import { TodoItem } from "./TodoItem";
export interface TodoDB {
  lastTodoId: number;
  todos: TodoItem[];
}
