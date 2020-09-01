import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./TodoItems.scss";

const List = ({ todo, checkTodo, deleteTodo, ...props }) => {
  const nodeRef = React.useRef(null);
  return (
    <CSSTransition
      timeout={300}
      classNames="todo"
      key={todo.id}
      {...props}
      nodeRef={nodeRef}
    >
      <div className="todo-item" ref={nodeRef}>
        <div className="todo-item__left">
          <label
            className={
              todo.completed
                ? "todo-item__label todo-checked"
                : "todo-item__label"
            }
            style={{ display: todo.edited && "none" }}
          >
            <input
              type="checkbox"
              onChange={(e) => checkTodo(todo.id, e)}
              checked={todo.completed}
            />
            {todo.content}
          </label>
          <input
            type="text"
            className={todo.edited ? "todo-item__edit show" : "todo-item__edit"}
            defaultValue={todo.content}
          />
        </div>
        <div className="todo-item__right">
          <div
            className="todo-remove__button"
            onClick={(e) => deleteTodo(todo.id, e)}
          >
            <span role="img" aria-label="emoticon">
              &times;
            </span>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

function TodoItems({ todosFilter, deleteTodo, checkTodo }) {
  let todoList = null;
  const nodeRef = React.useRef(null);

  if (todosFilter.length > 0) {
    todoList = todosFilter.map((todo) => {
      return (
        <List
          todo={todo}
          key={todo.id}
          checkTodo={checkTodo}
          deleteTodo={deleteTodo}
        />
      );
    });
  } else {
    todoList = (
      <CSSTransition classNames="todo" timeout={300} nodeRef={nodeRef}>
        <p className="todo-empty" ref={nodeRef}>
          ~ Empty Todo ~
        </p>
      </CSSTransition>
    );
  }

  return (
    <div>
      <div className="todo-header">
        <p className="title">My Todo List</p>
      </div>
      <div className="todo-parent">
        <TransitionGroup component={null}>{todoList}</TransitionGroup>
      </div>
    </div>
  );
}

export default TodoItems;
