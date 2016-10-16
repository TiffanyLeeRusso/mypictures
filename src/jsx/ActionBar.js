import React, { Component } from 'react';
import './css/ActionBar.css';

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
        <div className="col">
        {(() => {
          var albumSelector;
          if(this.props.albums.length > 0) {
            albumSelector = <AlbumSelector albums={this.props.albums}/>;
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

// Add-to-album button
class AddToAlbumButton extends Component {
  handleClick() {
    console.log('click!');
  }
  render() {
    return (
      <button className="btn" onClick={this.handleClick}>Add to Album</button>
    )
  }
}

// Album Selector
class AlbumSelector extends Component {
  render() {
    var albumList = this.props.albums.map(function(album) {
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
