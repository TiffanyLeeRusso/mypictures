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

  propTypes: { addToAlbum: React.PropTypes.func }

  updateSelectedAlbum(album) {
    this.setState({selectedAlbum: album});
  }

  close(save){
    // Clear the album for the next modal open.
    this.setState({selectedAlbum: {name: "", id: ""} });
    if(save) {
      this.props.addToAlbum(this.state.selectedAlbum);
    }
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

              {(() => {
                if(this.props.checkedPictures.length === 0) {
                  return <div className="no-selected-pictures">Please select at least one picture!</div>;
                } else {
                  return <AlbumManager albums={this.props.albums} selectedAlbum={this.state.selectedAlbum} updateSelectedAlbum={this.updateSelectedAlbum.bind(this)}/>
                }
              })()}

            </div>
            <div className="modal-footer">

              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.close.bind(this, false)}>Cancel</button>

              {(() => {
                if(this.props.checkedPictures.length > 0) {
                  return <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.close.bind(this, true)}>Save</button>
                }
                return null
              })()}

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

  propTypes: { updateSelectedAlbum: React.PropTypes.func }

  // AlbumManagerOverlay is resetting the album 
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedAlbum: nextProps.selectedAlbum
    });
  }

  // We received an album from AlbumSelector
  updateSelectedAlbum(album) {
    this.setState({ selectedAlbum: album });
    this.props.updateSelectedAlbum(album);
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
            <NewAlbumInput albumName={this.state.selectedAlbum.name} albumID={this.state.selectedAlbum.id} updateSelectedAlbum={this.updateSelectedAlbum.bind(this)}/>
          </div>
        </div>;

    } else {
      // There are no albums so ask the user to create a new album
      albumManager = 
        <div className="album-manager">
          <div className="description">Enter an album name:</div>
          <div className="input-group">
            <NewAlbumInput albumName="" albumID="" updateSelectedAlbum={this.updateSelectedAlbum.bind(this)}/>
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

  propTypes: { updateSelectedAlbum: React.PropTypes.func }

  componentWillReceiveProps(nextProps) {
    // We received an album from the parent so the AlbumSelector was used.
    // We should override our selectedAlbum.
    this.setState({
      selectedAlbum: {name: nextProps.albumName, id: nextProps.albumID}
    });
  }

  handleChange(event) {
    // The user is typing
    var newAlbum = {name: event.target.value, id: "" };
    this.setState({selectedAlbum: newAlbum });
    this.props.updateSelectedAlbum(newAlbum);
  }

  render() {
    return (
      <input type="text" className="form-control" aria-label="Select album"
             onChange={this.handleChange} value={this.state.selectedAlbum.name}
             data-album-id={this.state.selectedAlbum.id}/>
    )
  }
}

