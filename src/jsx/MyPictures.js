import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header.js';
import ActionBar from './ActionBar.js';
import Grid from './Grid.js';
import AlbumManagerOverlay from './AlbumManagerOverlay.js';
import '../css/MyPictures.css';

// MyPictures
export default class MyPictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureData: [],
      albums: [
        { id: "0",
          name: "Album 0" },
        { id: "1",
          name: "Album 1" },
        { id: "2",
          name: "Album 2" }
      ],
      checkedPictures: []
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

  updateCheckedPictures(pictureID, add) {
    if(add) {
      this.setState({
        checkedPictures: this.state.checkedPictures.concat( {id: pictureID} )
      });

    } else {
      var checkedPictures = this.state.checkedPictures;
      checkedPictures = $.grep(checkedPictures, function(o){ return o.id !== pictureID; });
      this.setState({ checkedPictures: checkedPictures });
    }
  }

  render() {
    return (
      <div className="my-pictures">
        <ActionBar additionalClass="action-bar-fixed" albums={this.state.albums}/>
        <Header />
        <ActionBar albums={this.state.albums}/>
        <Grid pictureData={this.state.pictureData} updateCheckedPictures={this.updateCheckedPictures.bind(this)}/>
        <AlbumManagerOverlay albums={this.state.albums} checkedPictures={this.state.checkedPictures}/>
      </div>
    );
  }
}
