import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import { Container, TextField, Button } from '@material-ui/core';

class Signup extends Component {
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

        API.signup({
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            if (response.status === 200) {
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
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <Container>
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
                                Sign Up
                            </Button>
                        </form>
                    </div>
                </Container>
            );
        }
    }
}

export default Signup;