import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Item from "./Item";
import "./TodoItems.scss";

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
        <Item
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
