//import fs = require("fs"); // CommonJS
import * as fs from "fs"; // ES6
import { v4 as uuid } from "uuid";
import { TodoItem } from "../model/TodoItem";
import { TodoDB } from "../model/TodoDB";

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

export function loadTodos(): Array<TodoItem> {
    return [...db.todos];
}

export function createTodo(content: string): TodoItem {
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

function updateTodo(id: string, toUpdate: Partial<TodoItem>) {
    const originalTodo = db.todos.find((todo) => todo.id === id);
    if (!originalTodo) {
        console.log(`Não foi possível localizar o id ${id} para atualização`);
        return;
    }
    Object.assign(originalTodo, toUpdate);
    saveDB();
}

export function updateContentByID(id: string, content: string) {
    updateTodo(id, { content });
}

export function closeTodoByID(id: string) {
    updateTodo(id, { done: true });
}

export function deleteTodoByID(id: string) {
    const originalTodo = db.todos.find((todo) => todo.id === id);
    if (!originalTodo) {
        return;
    }
    db.todos = db.todos.filter((todo) => todo.id !== id);
    setLastId(db);
    saveDB();
}

export default {
    createTodo,
    loadTodos,
    updateContentByID,
    closeTodoByID,
    deleteTodoByID,
};
