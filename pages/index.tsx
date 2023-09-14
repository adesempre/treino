import React from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { TodoItem } from "@model/TodoItem";
import { todoController } from "@ui/controller/todosController";

const bg: string = "/images/bg/filhotes.png";

export default function Page() {
    const [todos, setTodos] = React.useState<TodoItem[]>([]);
    const [taskContent, setTaskContent] = React.useState("");
    const [loaded, setLoaded] = React.useState(false);
    const handleDelete = (id: string) => {
        todoController.deleteTodoByID(id).then(() => {
            setTodos(todos.filter((t) => t.id !== id));
        });
    };
    const handleCreate = (e: React.SyntheticEvent) => {
        e.preventDefault();
        todoController.createTodo(taskContent).then((newTodo) => {
            setTodos([...todos, newTodo]);
            setTaskContent("");
        });
    };
    React.useEffect(() => {
        if (loaded) return;
        todoController.loadTodos().then((response) => {
            setTodos(response);
            setLoaded(true);
        });
    }, []);
    return (
        <main>
            <GlobalStyles themeName="indigo" />
            <header
                style={{
                    backgroundImage: `url('${bg}')`,
                }}
            >
                <div className="typewriter">
                    <h1>O que fazer hoje?</h1>
                </div>
                <form>
                    <input
                        type="text"
                        placeholder="Correr, Estudar..."
                        value={taskContent}
                        onChange={(e) => setTaskContent(e.target.value)}
                    />
                    <button
                        type="submit"
                        aria-label="Adicionar novo item"
                        onClick={(e) => handleCreate(e)}
                    >
                        +
                    </button>
                </form>
            </header>

            <section>
                <form>
                    <input
                        type="text"
                        placeholder="Filtrar lista atual, ex: Dentista"
                    />
                </form>

                <table border={1}>
                    <thead>
                        <tr>
                            <th align="left">
                                <input type="checkbox" disabled />
                            </th>
                            <th align="left">Id</th>
                            <th align="left">Conteúdo</th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {!loaded && (
                            <tr>
                                <td
                                    colSpan={4}
                                    align="center"
                                    style={{ textAlign: "center" }}
                                >
                                    Carregando...
                                </td>
                            </tr>
                        )}
                        {loaded &&
                            todos.length > 0 &&
                            todos.map((t) => (
                                <tr key={t.id}>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>{t.id}</td>
                                    <td>{t.content}</td>
                                    <td align="right">
                                        <button
                                            data-type="delete"
                                            onClick={() => handleDelete(t.id)}
                                        >
                                            Apagar
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        {/**
                        

                        {loaded &&
                            todos.length == 0 && <tr>
                            <td colSpan={4} align="center">
                                Nenhum item encontrado
                            </td>
                        </tr>

                        <tr>
                            <td
                                colSpan={4}
                                align="center"
                                style={{ textAlign: "center" }}
                            >
                                <button data-type="load-more">
                                    Carregar mais{" "}
                                    <span
                                        style={{
                                            display: "inline-block",
                                            marginLeft: "4px",
                                            fontSize: "1.2em",
                                        }}
                                    >
                                        ↓
                                    </span>
                                </button>
                            </td>
                        </tr>
                         */}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
