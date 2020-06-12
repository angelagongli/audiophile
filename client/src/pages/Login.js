import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import API from "../utils/API";
import { Container, TextField, Button } from '@material-ui/core';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        API.login({
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username,
                    userID: response.data._id
                });
                this.setState({
                    redirectTo: "/"
                })
            }
        }).catch(error => {
            console.log(error);                
        });
    }

    render() {
        if (this.state.redirectTo) {
            return (
                <Redirect to={{ pathname: this.state.redirectTo }} />
            );
        } else {
            return (
                <Container>
                    <Header>
                        Hi, Audiophile!
                    </Header>
                    <div className="login-signup">
                        <h2>
                            Login or <a href="/signup">Signup</a>
                        </h2>
                    </div>
                    <div className="form">
                        <form>
                            <TextField
                                name="username"
                                id="username"
                                type="text"
                                onChange={this.handleChange}
                                label="Username"
                                variant="outlined"
                                fullWidth />
                            <TextField
                                name="password"
                                id="password"
                                type="password"
                                onChange={this.handleChange}
                                label="Password"
                                variant="outlined"
                                fullWidth />
                            <Button
                                id="submit-btn"
                                variant="contained"
                                disabled={!(this.state.username && this.state.password)}
                                onClick={this.handleSubmit}
                                color="primary">
                                Log In
                            </Button>
                        </form>
                    </div>
                </Container>
            );
        }
    }
}

export default Login;
