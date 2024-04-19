import React, { Component } from 'react';
import '../css/Header.css';

// Header
export default class Header extends Component {
  render() {
    return (
      <div className="navbar navbar-inverse navbar-static-top">
        <img src="https://loremflickr.com/80/80/cat" alt="logo" />
        <h2>Welcome to MyPictures, a React experiment</h2>
      </div>
    );
  }
}
