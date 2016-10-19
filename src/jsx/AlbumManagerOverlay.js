import React, { Component } from 'react';
import AlbumSelector from './AlbumSelector.js';
import '../css/AlbumManagerOverlay.css';

// AlbumManagerOverlay
export default class AlbumManagerOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAlbum: {name: "", id: "" }
    };
  }

  close(save){
    // Clear the album for the next modal open
    this.setState({selectedAlbum: {name: "", id: ""} });
  }

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
              <AlbumManager albums={this.props.albums} selectedAlbum={this.state.selectedAlbum}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.close.bind(this, false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.close.bind(this, true)}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// AlbumManager
class AlbumManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAlbum: {name: "", id: "" }
    };
  }

  // AlbumManagerOverlay is resetting the album 
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedAlbum: nextProps.selectedAlbum
    });
  }

  // We received an album from AlbumSelector
  updateSelectedAlbum(album) {
    this.setState({ selectedAlbum: album });
  }

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
              <AlbumSelector updateSelectedAlbum={this.updateSelectedAlbum.bind(this)} albums={this.props.albums} text="Select Album"/>
            </div>
            <NewAlbumInput albumName={this.state.selectedAlbum.name} albumID={this.state.selectedAlbum.id}/>
          </div>
        </div>;

    } else {
      // There are no albums so ask the user to create a new album
      albumManager = 
        <div className="album-manager">
          <div className="description">Enter an album name:</div>
          <div className="input-group">
            <NewAlbumInput albumName="" albumID=""/>
          </div>
        </div>;
    }

    return albumManager;
  }
}

// NewAlbumInput
class NewAlbumInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAlbum: {name: "", id: "" }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // We received an album from the parent so the AlbumSelector was used.
    // We should override our selectedAlbum.
    this.setState({
      selectedAlbum: {name: nextProps.albumName, id: nextProps.albumID}
    });
  }

  handleChange(event) {
    // The user is typing
    this.setState({selectedAlbum: {name: event.target.value, id: "" } });
  }

  render() {
    return (
      <input type="text" className="form-control" aria-label="Select album"
             onChange={this.handleChange} value={this.state.selectedAlbum.name}
              data-album-id={this.state.selectedAlbum.id}/>
    )
  }
}

