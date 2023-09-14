//import fs = require("fs"); // CommonJS
import * as fs from "fs"; // ES6
import { v4 as uuid } from "uuid";
import { TodoItem } from "../model/TodoItem";
import { TodoDB } from "../model/TodoDB";
import TodoActions from "@model/TodoActions";

const DB_FILE_PATH = "./core/db";
const db: TodoDB = loadDB();

function setLastId(db: TodoDB) {
    db.lastTodoId =
        db.todos.length === 0 ? "" : db.todos[db.todos.length - 1].id ?? "";
}

function loadDB(): TodoDB {
    console.log("Lendo a base de dados...");
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    try {
        const db = JSON.parse(dbString || "{}");
        if (!db.todos) {
            // Fail Fast Validations
            console.log("DB sem estrutura de TODO's");
            return clearBD();
        }
        console.log(`Total de TODO's inicializados: ${db.todos.length}`);
        setLastId(db);
        return db;
    } catch (error) {
        console.log("DB com estrutura inválida");
        return clearBD();
    }
}

function clearBD(): TodoDB {
    console.log("DB reiniciado");
    fs.writeFileSync(DB_FILE_PATH, "");
    return { lastTodoId: "", todos: [] };
}

function saveDB() {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 4));
}

function updateTodo(id: string, toUpdate: Partial<TodoItem>) {
    const originalTodo = loadById(id);
    Object.assign(originalTodo, toUpdate);
    saveDB();
}

function loadTodos(): TodoItem[] {
    return [...db.todos];
}

function loadById(id: string): TodoItem {
    const originalTodo = db.todos.find((todo) => todo.id === id);
    if (!originalTodo) throw new Error(`A tarefa "${id}" não foi localizada`);
    return originalTodo;
}

function createTodo(content: string): TodoItem {
    const todo: TodoItem = {
        id: uuid(),
        date: new Date().toISOString(),
        content: content,
        done: false,
    };
    db.lastTodoId = todo.id;
    db.todos.push(todo);
    saveDB();
    return todo;
}

function updateContentByID(id: string, content: string): void {
    updateTodo(id, { content });
}

function closeTodoByID(id: string): void {
    updateTodo(id, { done: true });
}

function deleteTodoByID(id: string): void {
    loadById(id);

    db.todos = db.todos.filter((todo) => todo.id !== id);
    setLastId(db);
    saveDB();
}

const TodoDAL: TodoActions = {
    loadTodos,
    loadById,
    createTodo,
    updateContentByID,
    closeTodoByID,
    deleteTodoByID,
};

export default TodoDAL;
