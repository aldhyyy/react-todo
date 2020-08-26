import React from "react";
import "./TodoItems.css";

function TodoItems({ todosFilter, deleteTodo, checkTodo }) {
  let todoList = null;

  if (todosFilter.length <= 0) {
    todoList = <p className="todo-empty">~ Empty Todo ~</p>;
  } else {
    todoList = todosFilter.map((todo) => {
      return (
        <div className="todo-item" key={todo.id}>
          <div className="todo-item__left">
            <input
              type="checkbox"
              onChange={(e) => checkTodo(todo.id, e)}
              checked={todo.completed}
            />
            <div
              className={
                todo.completed
                  ? "todo-item__label todo-checked"
                  : "todo-item__label"
              }
              style={{ display: todo.edited && "none" }}
            >
              {todo.content}
            </div>
            <input
              type="text"
              className={
                todo.edited ? "todo-item__edit show" : "todo-item__edit"
              }
              defaultValue={todo.content}
            />
          </div>
          <div className="todo-item__right">
            <div
              className="todo-remove__button"
              onClick={(e) => deleteTodo(todo.id, e)}
            >
              <span role="img" aria-label="emoticon">
                ❌
              </span>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="todo-header">
        <p className="title">My Todo List</p>
      </div>
      <div className="todo-parent">{todoList}</div>
    </div>
  );
}

export default TodoItems;
