import React from "react";
import Header from "../components/Header";
import TodoItems from "../components/TodoItems";
import TodoForm from "../components/TodoForm";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filter: "all",
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
      todosFilter: [
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
    this.checkTodos = this.checkTodos.bind(this);
  }

  addTodo(todo) {
    todo.id = Math.random().toFixed(5);
    const todos = [...this.state.todos, todo];

    this.setState({
      todos: todos,
      todosFilter: todos,
    });
  }

  deleteTodo(id) {
    const todos = this.state.todos.filter((todo) => todo.id !== id);

    this.setState({
      todos: todos,
      todosFilter: todos,
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
      todosFilter: todos,
    });
  }

  checkTodos(e) {
    const todos = this.state.todos.map((todo) => {
      todo.completed = e.target.checked;
      return todo;
    });
    this.setState({
      todos: todos,
      todosFilter: todos,
    });
  }

  filterTodos(filter = null) {
    if (filter === true) {
      this.setState({
        filter: "completed",
        todosFilter: this.state.todos.filter((todo) => todo.completed),
      });
    } else if (filter === false) {
      this.setState({
        filter: "not completed",
        todosFilter: this.state.todos.filter((todo) => !todo.completed),
      });
    } else {
      this.setState({
        filter: "all",
        todosFilter: this.state.todos,
      });
    }
  }

  clearCompleted = () => {
    let todos = this.state.todos.filter((todo) => !todo.completed);
    this.setState({
      todos: todos,
      todosFilter: todos,
      filter: "all",
    });
  };

  editTodo = (id, e) => {
    const todos = [...this.state.todos].map((todo) => {
      if (todo.id === id) {
        todo.edited = true;
      }
      return todo;
    });
    this.setState({
      todos,
      todosFilter: todos,
    });
  };

  doneEdit = (id) => {
    const todos = [...this.state.todos].map((todo) => {
      if (todo.id === id) {
        todo.edited = false;
      }
      return todo;
    });
    this.setState({
      todos,
      todosFilter: todos,
    });
  };

  handelChange = (id, e) => {
    const todos = [...this.state.todos].map((todo) => {
      if (todo.id === id) {
        todo.content = e.target.value;
      }
      return todo;
    });
    this.setState({
      todos,
      todosFilter: todos,
    });
  };

  render() {
    const todos = [...this.state.todosFilter];
    const reverseTodos = todos.reverse();
    const itemLeft = [...this.state.todos].filter((todo) => !todo.completed)
      .length;
    return (
      <div className="wrapper">
        <Header />

        <TodoForm addTodo={this.addTodo} />

        <TodoItems
          todosFilter={reverseTodos}
          deleteTodo={this.deleteTodo}
          checkTodo={this.checkTodo}
          editTodo={this.editTodo}
          doneEdit={this.doneEdit}
          handelChange={this.handelChange}
        />

        {this.state.todos.length >= 1 && (
          <div className="extra-container">
            <div>
              <input
                id="checkAll"
                type="checkbox"
                checked={!itemLeft}
                onChange={this.checkTodos}
              />
              <label htmlFor="checkAll">Check All</label>
            </div>
            <div>{itemLeft} items left</div>
          </div>
        )}

        {this.state.todos.length >= 1 && (
          <div className="extra-container">
            <div>
              <button
                onClick={(e) => this.filterTodos()}
                className={this.state.filter === "all" ? "active" : ""}
              >
                All
              </button>
              <button
                onClick={(e) => this.filterTodos(false, e)}
                className={
                  this.state.filter === "not completed" ? "active" : ""
                }
              >
                Active
              </button>
              <button
                onClick={(e) => this.filterTodos(true, e)}
                className={this.state.filter === "completed" ? "active" : ""}
              >
                Completed
              </button>
            </div>
            <div>
              {this.state.todos.filter((todo) => todo.completed).length > 0 && (
                <button onClick={this.clearCompleted}>Clear</button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
