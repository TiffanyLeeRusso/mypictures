import React, { Component } from 'react';
import $ from 'jquery';
import '../css/Grid.css';

// Grid
export default class Grid extends Component {
  propTypes: { updateCheckedPictures: React.PropTypes.func }

  render() {
    var pics = this.props.pictureData.map(function(pic) {
      let checked = this.props.checkedPictures.indexOf(pic.id) > -1 ? true : false;
      return (
          <GridItem showCheckboxes={this.props.showCheckboxes}
                    updateCheckedPictures={this.props.updateCheckedPictures}
                    key={pic.id} id={pic.id} width={pic.width} height={pic.height}
                    checked={checked}/>
      );
    }.bind(this));
    return (
      <ul className="grid">
        {pics}
      </ul>
    );
  }
}

// GridItem
class GridItem extends Component {
  propTypes: { updateCheckedPictures: React.PropTypes.func }

  onChange(event) {
    this.props.updateCheckedPictures($(event.target).attr("data-picture-id"), event.target.checked);
  }

  render() {
    return (
      <li className="grid-item">
        <img src={"https://placekitten.com/" + this.props.width + "/" + this.props.height} alt="kitten"/>
        {(() => {
          if(this.props.showCheckboxes) {
            return <label className="select-box" htmlFor={"picture-" + this.props.id}>
                     <input checked={this.props.checked} type="checkbox" 
                            id={"picture-" + this.props.id} data-picture-id={this.props.id}
                            className="picture-selector"
                            onChange={this.onChange.bind(this)}/>
                     <span>Add to album</span>
                   </label>
          }
          return null;
        })()}
      </li>
    );
  }
}
