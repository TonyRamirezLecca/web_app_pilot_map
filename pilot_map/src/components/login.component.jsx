import React, { Component } from 'react';
import axios from 'axios';
import "../css/signin.css";



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:5000/users/login', newUser)
            .then(res => {
                console.log('response', res.data);
                let data = JSON.parse(res.data);
                window.localStorage.setItem('isAuthenticated', true);
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('_id', data.id);
                this.props.history.push('/my-map');
                window.location.reload(false);
            })
            .catch(error => {
                console.log('error with logging in: ' + error);
                window.localStorage.setItem('isAuthenticated', false);
            });
    }

    onUsernameChange = ({ target }) => {
        this.setState({
            username: target.value
        })
    }

    onPasswordChange = ({ target }) => {
        this.setState({
            password: target.value
        })
    }

    render() {


        return (
            <div className="login_wrapper">
                <form id="login_form" onSubmit={this.onSubmit}>
                    <div className="signup_label-ctn">
                        <div className="login_label-left-line"></div>
                        <div className="login_label">Login</div>
                        <div className="login_label-right-line"></div>
                    </div>
                    <input
                        autoFocus
                        required
                        type="text"
                        id="login_username"
                        name="login_username"
                        placeholder="Username"
                        onChange={this.onUsernameChange}
                    ></input>
                    <br />
                    <input
                        required
                        type="password"
                        id="login_password"
                        name="login_password"
                        placeholder="password"
                        onChange={this.onPasswordChange}
                    ></input>
                    <br />
                    <button type="submit" id="login_submit">Login Now</button>
                </form>
            </div>
        )
    }


}

