import { TodoItem } from "@model/TodoItem";

const BASE_API: string = "/api/todos";

async function loadTodos(): Promise<TodoItem[]> {
    return fetch(BASE_API).then(async (response) => {
        const textResponse = await response.text();
        const jsonResponse = JSON.parse(textResponse);
        return jsonResponse as TodoItem[];
    });
}

async function createTodo(content: string): Promise<TodoItem> {
    return fetch(`${BASE_API}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    }).then(async (response) => {
        const textResponse = await response.text();
        const jsonResponse = JSON.parse(textResponse);
        return jsonResponse as TodoItem;
    });
}

async function closeTodoByID(id: string): Promise<void> {
    await fetch(`${BASE_API}/close/${id}`);
}

async function updateContentByID(id: string, content: string): Promise<void> {
    await fetch(`${BASE_API}/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    }).then(async (response) => {
        const textResponse = await response.text();
        const jsonResponse = JSON.parse(textResponse);
        return jsonResponse as TodoItem;
    });
}

async function deleteTodoByID(id: string): Promise<void> {
    await fetch(`${BASE_API}/delete/${id}`);
}

export const todoController = {
    loadTodos,
    createTodo,
    closeTodoByID,
    updateContentByID,
    deleteTodoByID,
};
