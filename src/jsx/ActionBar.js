import React, { Component } from 'react';
import AlbumSelector from './AlbumSelector.js';
import '../css/ActionBar.css';

// Action Bar
export default class ActionBar extends Component {
  propTypes: { updateSelectedAlbum: React.PropTypes.func }

  updateSelectedAlbum(album) {
    this.props.updateSelectedAlbum(album);
  }

  render() {
    var additionalActionBarClass = this.props.additionalClass ? this.props.additionalClass : "";
    return (
      <div className={"action-bar " + additionalActionBarClass}>
        {(() => {
          if(this.props.addAvailable) {
            return <div className="col">
                     <AddToAlbumButton/>
                   </div>
          }
          return null;
        })()}

        {(() => {
          if(this.props.albums.length > 0) {
            return <div className="col">
                     <AlbumSelector updateSelectedAlbum={this.updateSelectedAlbum.bind(this)} albums={this.props.albums} text="View Album" showAll="true"/>
                   </div>;
          }
          return null;
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
