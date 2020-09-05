import React, { useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./TodoItems.scss";

const List = (props) => {
  const nodeRef = React.useRef(null);
  const editRef = React.useRef(null);
  const {
    todo,
    checkTodo,
    deleteTodo,
    editTodo,
    doneEdit,
    handelChange,
    ...propsLeft
  } = props;

  function handleEnter(event) {
    if (event.key === "Enter") {
      doneEdit(todo.id);
    }
  }

  // Only fire if value of edited is changed
  useEffect(() => {
    if (todo.edited === true) {
      editRef.current.focus();
    }
  }, [todo.edited]);

  return (
    <CSSTransition
      timeout={300}
      classNames="todo"
      key={todo.id}
      {...propsLeft}
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
            value={todo.content}
            onChange={(e) => handelChange(todo.id, e)}
            onKeyPress={handleEnter}
            ref={editRef}
          />
        </div>
        <div className="todo-item__right">
          <div
            className="todo-item__button"
            onClick={(e) => editTodo(todo.id, e)}
            style={{ display: todo.edited && "none" }}
          >
            <span role="img" aria-label="emoticon">
              edit
            </span>
          </div>
          <div
            className="todo-item__button"
            onClick={(e) => deleteTodo(todo.id, e)}
            style={{ display: todo.edited && "none" }}
          >
            <span role="img" aria-label="emoticon">
              delete
            </span>
          </div>
          <div
            className="todo-item__button"
            onClick={(e) => doneEdit(todo.id, e)}
            style={{ display: !todo.edited ? "none" : "block" }}
          >
            <span role="img" aria-label="emoticon">
              done
            </span>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

function TodoItems(props) {
  const {
    todosFilter,
    deleteTodo,
    checkTodo,
    editTodo,
    doneEdit,
    handelChange,
  } = props;
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
          editTodo={editTodo}
          doneEdit={doneEdit}
          handelChange={handelChange}
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
