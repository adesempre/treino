//import fs = require("fs"); // CommonJS
import * as fs from "fs"; // ES6
import { TodoItem } from "./model/TodoItem";
import { TodoDB } from "./model/TodoDB";

const DB_FILE_PATH = "./core/db";
let db: TodoDB;

console.log("[CRUD]");

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
    // fix last TODO id (se os últimos foram removidos, posso)
    db.lastTodoId = db.todos.length = 0
      ? 0
      : db.todos[db.todos.length - 1].id ?? 0;
    return db;
  } catch (error) {
    console.log("DB com estrutura inválida");
    return clearBD();
  }
}

function clearBD(): TodoDB {
  console.log("DB reiniciado");
  fs.writeFileSync(DB_FILE_PATH, "");
  return { lastTodoId: 0, todos: [] };
}

function create(content: string): TodoItem {
  const todo: TodoItem = {
    id: ++db.lastTodoId,
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  db.todos.push(todo);
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 4));
  return todo;
}

// SIMULATION
db = loadDB();
create(`tarefa ${db.lastTodoId + 1}`);
create(`tarefa ${db.lastTodoId + 1}`);
