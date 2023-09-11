import db from "./controller/dbController";

console.log("[CRUD]");

db.createTodo("tarefa generica");
db.createTodo("outra tarefa");

const todos = db.loadTodos();
console.log("Inicial", JSON.stringify(todos, null, 4));

db.updateContentByID(todos[0].id, "opa");
db.closeTodo(todos[0].id);
db.deleteTodo(todos[todos.length - 1].id)

console.log("Final", JSON.stringify(db.loadTodos(), null, 4));