import todosDAL from "@dal/todosDAL";
import { NextApiRequest, NextApiResponse } from "next";

function loadTodos(_: NextApiRequest, res: NextApiResponse) {
    const ALL_TODOS = todosDAL.loadTodos();
    res.status(200).json(ALL_TODOS);
}

function createTodo(req: NextApiRequest, res: NextApiResponse) {
    const { content } = req.body;
    const NEW_TODO = todosDAL.createTodo(`${content}`);
    res.status(200).json(NEW_TODO);
}

function closeTodoByID(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    todosDAL.closeTodoByID(`${id}`);
    res.status(200).json({ sucess: true });
}

async function updateContentByID(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { content } = req.body;
    todosDAL.updateContentByID(`${id}`, `${content}`);
    res.status(200).json({ sucess: true });
}

async function deleteTodoByID(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    todosDAL.deleteTodoByID(`${id}`);
    res.status(200).json({ sucess: true });
}

export const todoController = {
    loadTodos,
    createTodo,
    closeTodoByID,
    updateContentByID,
    deleteTodoByID,
};
