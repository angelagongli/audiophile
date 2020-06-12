import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Queue from "./pages/Queue";
import Library from "./pages/Library";
import Play from "./pages/Play";
import "./assets/css/style.css";
import API from "./utils/API";
import UserContext from "./utils/userContext";

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      userID: null
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    API.getUserData()
      .then(response => {
        if (response.data.username) {
          this.setState({
            loggedIn: true,
            username: response.data.username,
            userID: response.data.id
          })
        } else {
          this.setState({
            loggedIn: false,
            username: null,
            userID: null
          })
        }
      }).catch(err => {
        console.log(err);
      });
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  render() {
    return (
      !this.state.loggedIn ?
      <Router>
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route>
            <Login updateUser={this.updateUser} />
          </Route>
        </Switch>
      </Router> 
      : 
      <UserContext.Provider value={{ username: this.state.username, userID: this.state.userID }}>
        <Router>
          <Switch>
            <Route exact path="/search">
              <Search updateUser={this.updateUser} />
            </Route>
            <Route exact path="/queue">
              <Queue updateUser={this.updateUser} />
            </Route>
            <Route exact path="/library">
              <Library updateUser={this.updateUser} />
            </Route>
            <Route exact path="/play/:id">
              <Play updateUser={this.updateUser} />
            </Route>
            <Route>
              <Home updateUser={this.updateUser} />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
