import React, { Component } from 'react';
import '../css/home.css';
import { Link } from 'react-router-dom';

const images = require.context("../../public", true);
const heroImg = images("./valley.jpg");

export default class Home extends Component {
    render() {
        return (
            <div className="home_wrapper">
                <div className="home_hero" style={{ backgroundImage: `url(${heroImg})` }}>
                    <div className="home_header-left">
                        <div className="home_header-left__text-ctn">
                            <h1>Track where you go.</h1>
                            <h1>See where you've been.</h1>
                            <h1>Share.</h1>
                            <Link to="/users/register">Start Mapping Today</Link>
                            <div className="home-header-left__text-ctn-background"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
