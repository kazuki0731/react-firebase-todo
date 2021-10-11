import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { TodosContext } from "../contexts/TodosProvider";

export const Todos = () => {
  const { signout } = useContext(AuthContext);
  const { todos, add, update, remove } = useContext(TodosContext);
  const logOut = () => {
    signout();
  };
  const hanldeSubmit = (e) => {
    e.preventDefault();
    add(e.target.todo.value);
  };

  const handleChange = (id, isComplete) => {
    update(id, isComplete);
  };

  const handleDelete = (id) => {
    remove(id);
  };

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={hanldeSubmit}>
        <input type="text" name="todo" />
        <button>追加</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              name=""
              checked={todo.isComplete}
              style={{
                textDecoration: todo.isComplete ? "line-through" : "none",
              }}
              onChange={() => handleChange(todo.id, todo.isComplete)}
            />
            <span
              style={{
                textDecoration: todo.isComplete ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
      <button onClick={logOut}>サインアウト</button>
    </>
  );
};
