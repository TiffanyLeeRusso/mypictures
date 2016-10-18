import React, { Component } from 'react';
import AlbumSelector from './AlbumSelector.js';
import '../css/AlbumManagerOverlay.css';

// AlbumManagerOverlay
export default class AlbumManagerOverlay extends Component {
  render() {
    return (
      <div className="modal fade" id="albumManagerOverlay" tabIndex="-1" role="dialog" aria-labelledby="album-manager-overlay-label">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="album-manager-overlay-label">Add to Album</h4>
            </div>
            <div className="modal-body">
              <AlbumManager albums={this.props.albums}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// AlbumManager
class AlbumManager extends Component {
  render() {
    var albumManager;

    // If there are albums show the album selector
    if(this.props.albums.length > 0) {
      albumManager = 
        <div className="album-manager">
          <div className="description">
            Add selected pictures to which album?
          </div>

          <div className="input-group">
            <div className="input-group-btn">
              <AlbumSelector albums={this.props.albums} text="Select Album"/>
            </div>
            <NewAlbumInput/>
          </div>
        </div>;

    } else {
      // There are no albums so ask the user to create a new album
      albumManager = 
        <div className="album-manager">
          <div className="description">Enter an album name:</div>
          <div className="input-group">
            <NewAlbumInput/>
          </div>
        </div>;
    }

    return albumManager;
  }
}

// NewAlbumInput
class NewAlbumInput extends Component {
  render() {
    return (
      <input type="text" className="form-control" aria-label=""/>
    )
  }
}

