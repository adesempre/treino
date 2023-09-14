import { todoController } from "@server/controller/todosController";
import { NextApiRequest, NextApiResponse } from "next";

export default function handles(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }
    todoController.loadTodos(req, res);
}
