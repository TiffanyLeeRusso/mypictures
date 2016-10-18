import React, { Component } from 'react';
import AlbumSelector from './AlbumSelector.js';
import '../css/ActionBar.css';

// Action Bar
export default class ActionBar extends Component {
  render() {
    var additionalActionBarClass = this.props.additionalClass ? this.props.additionalClass : "";
    return (
      <div className={"action-bar " + additionalActionBarClass}>
        <div>Full functionality coming soon!</div>
        <div className="col">
          <AddToAlbumButton/>
        </div>
        {(() => {
          var albumSelector;
          if(this.props.albums.length > 0) {
            albumSelector = 
              <div className="col">
                <AlbumSelector albums={this.props.albums} text="View Album"/>
              </div>;
          } else {
            albumSelector = null;
          }
          return albumSelector;
        })()}
      </div>
    );
  }
}

// Add-to-album button
class AddToAlbumButton extends Component {
  render() {
    return (
      <button type="button" className="btn" data-toggle="modal" data-target="#albumManagerOverlay">
        Add to Album
      </button>
    )
  }
}
