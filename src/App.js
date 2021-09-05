import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TodosList from "./components/todos-list.component";
import UsersList from "./components/users-list.component";
import PostsList from "./components/posts-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            ninviT
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/todos"} className="nav-link">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/posts"} className="nav-link">
                Posts
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/todos"]} component={TodosList} />
            <Route exact path={["/users"]} component={UsersList} />
            <Route exact path={["/posts"]} component={PostsList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
