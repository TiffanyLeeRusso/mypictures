import React, { Component } from 'react';
import '../css/AlbumSelector.css';

// Album Selector
export default class AlbumSelector extends Component {
  render() {
    if(this.props.albums.length > 0) {
      var albumList = this.props.albums.map(function(album) {
        return (
          <li key={album.id}><a href="#" data-picId={album.id}>{album.name}</a></li>
        );
      });
      return (
        <div className="dropdown album-selector">
          <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">{this.props.text}&nbsp;
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {albumList}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="album-selector-empty"></div>
      );
    }
  }
}
