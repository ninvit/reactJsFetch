import React, { Component } from "react";
import TodoDataService from "../services/tutorial.service";

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTodos = this.retrieveTodos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTodo = this.setActiveTodo.bind(this);
    this.removeAllTodos = this.removeAllTodos.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      todos: [],
      currentTodo: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTodos();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTodos() {
    TodoDataService.getAll()
      .then(response => {
        this.setState({
          todos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTodos();
    this.setState({
      currentTodo: null,
      currentIndex: -1
    });
  }

  setActiveTodo(todo, index) {
    this.setState({
      currentTodo: todo,
      currentIndex: index
    });
  }

  removeAllTodos() {
    TodoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTodo: null,
      currentIndex: -1
    });

    TodoDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          todos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { todos, currentTodo, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <div className="input-group-append">
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Todos List</h4>

          <ul className="list-group">
            {todos &&
              todos.map((todo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTodo(todo, index)}
                  key={index}
                >
                  {todo.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentTodo ? (
            <div>
              <h4>Todo</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTodo.title}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTodo.completed ? "Completed" : "Pending"}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Todo...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
