import React, { Component } from 'react';
import axios from 'axios';
import "../css/signup.css";

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newUsername: '',
            newPassword: '',
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username: this.state.newUsername,
            password: this.state.newPassword
        }

        axios.post('http://localhost:5000/users/register', newUser)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/users/login');
            })
            .catch(error => console.log('error with adding new user: ' + error));
    }

    onUsernameChange = ({ target }) => {
        this.setState({
            newUsername: target.value
        })
    }

    onPasswordChange = ({ target }) => {
        this.setState({
            newPassword: target.value
        })
    }

    render() {
        return (
            <div className="signup_wrapper">
                <form onSubmit={this.onSubmit} id="signup_form">
                    <div className="signup_label-ctn">
                        <div className="signup_label-left-line"></div>
                        <div className="signup_label">Register</div>
                        <div className="signup_label-right-line"></div>
                    </div>
                    <input
                        autoFocus
                        type="text"
                        id="signup_username"
                        name="signup_username"
                        placeholder="Username"
                        onChange={this.onUsernameChange}
                    ></input>
                    <br />
                    <input
                        type="password"
                        id="signup_password"
                        name="signup_password"
                        placeholder="password"
                        onChange={this.onPasswordChange}
                    ></input>
                    <br />
                    <button type="submit" id="signup_submit">Register Now</button>
                </form>
            </div>
        )
    }
}

