import React from "react";
import "./TodoForm.css";

class TodoForm extends React.Component {
  constructor() {
    super();

    this.state = {
      content: "",
      id: "",
      completed: false,
      edited: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      content: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const inputContent = document.getElementById("content");

    if (!inputContent.value) {
      inputContent.focus();
      return null;
    } else {
      this.props.addTodo(this.state);

      this.setState({
        content: "",
        id: "",
        completed: false,
        edited: false,
      });
    }
  }

  render() {
    return (
      <>
        <form
          className="todo-form"
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <input
            type="text"
            name="content"
            placeholder="What needs to be done ?"
            id="content"
            className="todo-input"
            onChange={this.handleChange}
            value={this.state.content}
          />
          <button type="submit" className="todo-button__add">
            ADD
          </button>
        </form>
      </>
    );
  }
}

export default TodoForm;
