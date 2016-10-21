import React, { Component } from 'react';
import '../css/AlbumSelector.css';

// Album Selector
export default class AlbumSelector extends Component {
  propTypes: { updateSelectedAlbum: React.PropTypes.func }

  handleClick(albumName, albumID) {
    this.props.updateSelectedAlbum({ name: albumName, id: albumID });
  }

  render() {

    if(this.props.albums.length > 0) {

      var albumList = this.props.albums.map(function(album) {
        return (
          <li key={album.id}><a href="#" onClick={this.handleClick.bind(this, album.name, album.id)} data-picId={album.id}>{album.name}</a></li>
        );
      }.bind(this));

      return (
        <div className="dropdown album-selector">
          <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">{this.props.text}&nbsp;
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {(() => {
              if(this.props.showAll) {
                return <li key="showAll"><a href="#" onClick={this.handleClick.bind(this, "", "")} data-picId="">Show All</a></li>
              }
              return null;
            })()}

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

