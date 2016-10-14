import React, { Component } from 'react';
import './App.css';

// Set up some data for the pictures
var pictureData = [];
var numPics = 20;
var increment = 20;
var dimensions = 200;
for(let i = 0; i < numPics; i++) {
    let currentPicture = {
      id: dimensions + "x" + dimensions,
      width: dimensions,
      height: dimensions
    };
    dimensions += increment;
    pictureData.push(currentPicture);
}

// App
class App extends Component {
    render() {
        return (
            <div className="App">
              <Header />
              <Grid />
            </div>
            );
    }
}

// Header
class Header extends Component {
    render() {
        return (
            <div className="App">
              <div className="navbar navbar-inverse navbar-static-top">
                <img src="https://placekitten.com/70/70" alt="logo" />
                <h2>Welcome to MyPictures, a React experiment</h2>
              </div>
            </div>
            );
    }
}

// Grid
class Grid extends Component {
    render() {
        var pics = pictureData.map(function(pic) {
          return (
            <GridItem id={pic.id} width={pic.width} height={pic.height}/>
              );
            });
        return (
            <ul className="grid">
              {pics}
            </ul>
            );
    }
}

class GridItem extends Component {
    render() {
        return (
            <li className="grid-item">
              <img src={"https://placekitten.com/" + this.props.width + "/" + this.props.height} alt="kitten"/>
              <label className="select-box" htmlFor={this.props.id}>
                <input type="checkbox" id={this.props.id} />
                <span>Add to album</span>
              </label>
            </li>
            );
    }
}

export default App;

