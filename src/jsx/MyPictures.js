import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header.js';
import ActionBar from './ActionBar.js';
import Grid from './Grid.js';
import '../css/MyPictures.css';

var albums = [
  { id: "0",
    name: "Album 0" },
  { id: "1",
    name: "Album 1" },
  { id: "2",
    name: "Album 2" }
];

// MyPictures
export default class MyPictures extends Component {
 constructor(props) {
    super(props);
    this.state = {
      pictureData: [],
      albums: albums
    };
  }

  componentDidMount() {
    // Fetch the data
    $.ajax({
      url: 'pictures.json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({pictureData: data.pictureData});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

    // Set up the scroll listener
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
      <div className="my-pictures">
        <ActionBar additionalClass="action-bar-fixed" albums={this.state.albums}/>
        <Header />
        <ActionBar albums={this.state.albums}/>
      <Grid pictureData={this.state.pictureData}/>
      </div>
      );
  }
}
