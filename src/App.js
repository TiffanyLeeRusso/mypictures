import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

// Set up some data for the pictures
var pictureData = [];
var numPics = 16;
var dimensions = 200;
for(let i = 1; i <= numPics; i++) {
  let currentPicture = {
    id: i,
    width: dimensions,
    height: dimensions
  };
  pictureData.push(currentPicture);
}

var albums = [
  { id: "0",
    name: "Album 0" },
  { id: "1",
    name: "Album 1" },
  { id: "2",
    name: "Album 2" }
];

// App
export default class App extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if((window.pageYOffset || document.documentElement.scrollTop) >= 300) {
      $(".action-bar-fixed").addClass("action-bar-fixed-shown");
    } else {
      $(".action-bar-fixed").removeClass("action-bar-fixed-shown");
    }
  }

  render() {
    return (
      <div className="App">
        <ActionBar additionalClass="action-bar-fixed"/>
        <Header />
        <ActionBar/>
        <Grid />
      </div>
      );
  }
}

// Header
class Header extends Component {
  render() {
    return (
      <div className="navbar navbar-inverse navbar-static-top">
        <img src="https://placekitten.com/70/70" alt="logo" />
        <h2>Welcome to MyPictures, a React experiment</h2>
      </div>
    );
  }
}

// Action Bar
class ActionBar extends Component {
  render() {
    var additionalActionBarClass = this.props.additionalClass ? this.props.additionalClass : "";
    return (
      <div className={"action-bar " + additionalActionBarClass}>
        <div className="col">
          <button className="btn">Add Selected to Album</button>
        </div>
        <div className="col">
        {(() => {
          var albumSelector;
          if(albums.length > 0) {
            albumSelector = <AlbumSelector />;
          } else {
            albumSelector = null;
          }
          return albumSelector;
        })()}
        </div>
      </div>
    );
  }
}

// Album Selector
class AlbumSelector extends Component {
  render() {
    var albumList = albums.map(function(album) {
      return (
        <li key={album.id}><a href="#" data-picId={album.id}>{album.name}</a></li>
      );
    });
    return (
      <div className="dropdown">
        <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">View Album &nbsp;
          <span className="caret"></span></button>
        <ul className="dropdown-menu">
          {albumList}
        </ul>
      </div>
    );
  }
}

// Grid
class Grid extends Component {
  render() {
    var pics = pictureData.map(function(pic) {
      return (
        <GridItem key={pic.id} id={pic.id} width={pic.width} height={pic.height}/>
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
        <img src={"https://placekitten.com/" + this.props.width + "/" + this.props.height + "?image=" + this.props.id} alt="kitten"/>
        <label className="select-box" htmlFor={this.props.id}>
          <input type="checkbox" id={this.props.id} />
          <span>Add to album</span>
        </label>
      </li>
    );
  }
}

