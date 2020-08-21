import React from "react";
import Header from "./components/Header";
import TodoItems from "./components/TodoItems";
import TodoForm from "./components/TodoForm";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [
        {
          id: 1,
          content: "take over the world",
          completed: false,
          edited: false,
        },
        {
          id: 2,
          content: "being awesome daily",
          completed: false,
          edited: false,
        },
      ],
    };

    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.checkTodo = this.checkTodo.bind(this);
    this.checkAllTodo = this.checkAllTodo.bind(this);
  }

  addTodo(todo) {
    todo.id = Math.random().toFixed(5);
    const todos = [...this.state.todos, todo];
    this.setState({
      todos: todos,
    });
  }

  deleteTodo(id) {
    const todos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      todos: todos,
    });
  }

  checkTodo(id, e) {
    const todos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = e.target.checked;
      }
      return todo;
    });
    this.setState({
      todos: todos,
    });
  }

  checkAllTodo(e) {
    const todos = this.state.todos.map((todo) => {
      todo.completed = e.target.checked;
      return todo;
    });
    this.setState({
      todos: todos,
    });
  }

  render() {
    const itemLeft = this.state.todos.filter((todo) => !todo.completed).length;

    return (
      <div className="wrapper">
        <Header />

        <TodoForm addTodo={this.addTodo} />

        <TodoItems
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
          checkTodo={this.checkTodo}
          editTodo={this.editTodo}
          finishEdit={this.finishEdit}
        />

        {this.state.todos.length >= 1 && (
          <div className="extra-container">
            <div>
              <input
                id="checkAll"
                type="checkbox"
                checked={!itemLeft}
                onChange={this.checkAllTodo}
              />
              <label htmlFor="checkAll">Check All</label>
            </div>
            <div>{itemLeft} items left</div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
