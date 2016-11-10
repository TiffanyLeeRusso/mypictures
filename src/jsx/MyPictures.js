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
      pictureData: [], // objects with 'width', 'height', and 'id'
      currentPictureData: [], // subset of pictureData
      currentAlbum: null,
      albums: [
        { id: "0",
          name: "Album 0",
          pictures: [1, 2] },
        { id: "1",
          name: "Album 1",
          pictures: [3, 4, 5, 6, 7] },
        { id: "2",
          name: "Album 2",
          pictures: [3, 8, 16] }
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
        this.setState({pictureData: data.pictureData, currentPictureData: data.pictureData});
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
    let checkedPictures = this.state.checkedPictures;

    if(add) {
      checkedPictures.push(parseInt(pictureID, 10));

    } else {
      let picToRemove = checkedPictures.indexOf(parseInt(pictureID, 10));
      if(picToRemove > -1) { checkedPictures.splice(picToRemove, 1); }
    }

    this.setState({ checkedPictures: checkedPictures });
  }

  updateSelectedAlbum(album) {
    // If we did not receive album info, show all pictures
    if(!album.id) {
      this.setState({ currentAlbum: null,
                      checkedPictures: [],
                      currentPictureData: this.state.pictureData });
      return true;
    }

    // Get the current album information from our album list
    let currentAlbum = $.grep(this.state.albums, function(o){ return o.id === album.id; })[0];

    // Get the picture info for the current album from our picture-data list
    let currentPictures = [];
    for(let i = 0; i < currentAlbum.pictures.length; i++) {
      let currentPicture = $.grep(this.state.pictureData, function(o){ return o.id === currentAlbum.pictures[i]; })[0];
      currentPictures.push(currentPicture);
    }

    // Set currentPictureData, which will trigger a redraw of the grid.
    this.setState({ currentAlbum: album.id,
                    checkedPictures: [],
                    currentPictureData: currentPictures });
  }

  // Add this.state.checkedPictures to the given album
  addToAlbum(album) {
    var albums = this.state.albums;

    if(!album.id) {
      // New album
      var lastID = parseInt(albums[albums.length - 1].id, 10);
      var newAlbum = { id: ++lastID,
                       name: album.name,
                       pictures: this.state.checkedPictures
      }

      albums.push(newAlbum);

    } else {
      // Add to existing album
      var existingAlbumIndex = albums.findIndex(function(el) { return el.id === album.id; });
      var existingAlbum = albums[existingAlbumIndex];

      existingAlbum.pictures = existingAlbum.pictures.concat(this.state.checkedPictures);
      $.uniqueSort(existingAlbum.pictures); // remove duplicate pictures

      // Replace the existing album
      albums.splice(existingAlbumIndex, 1, existingAlbum);
    }

    this.setState({
      albums: albums,
      checkedPictures: []
    });
  }

  render() {
    return (
      <div className="my-pictures">
        <ActionBar additionalClass="action-bar-fixed" 
                   addAvailable={this.state.currentAlbum === null}
                   albums={this.state.albums}
                   updateSelectedAlbum={this.updateSelectedAlbum.bind(this)}/>
        <Header />
        <ActionBar albums={this.state.albums}
                   addAvailable={this.state.currentAlbum === null}
                   updateSelectedAlbum={this.updateSelectedAlbum.bind(this)}/>
        <Grid pictureData={this.state.currentPictureData}
              checkedPictures={this.state.checkedPictures}
              showCheckboxes={this.state.currentAlbum === null}
              updateCheckedPictures={this.updateCheckedPictures.bind(this)}/>
        <AlbumManagerOverlay albums={this.state.albums}
                   checkedPictures={this.state.checkedPictures}
                   addToAlbum={this.addToAlbum.bind(this)}/>
      </div>
    );
  }
}
