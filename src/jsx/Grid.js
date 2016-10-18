import React, { Component } from 'react';
import '../css/Grid.css';

// Grid
export default class Grid extends Component {
  render() {
    var pics = this.props.pictureData.map(function(pic) {
      return (
        <GridItem key={pic.id} id={pic.id} width={pic.width} height={pic.height}/>
      );
    });
    return (
      <ul className="grid">
        {pics}
      </ul>
    );
  }
}

// GridItem
class GridItem extends Component {
  render() {
    return (
      <li className="grid-item">
        <img src={"https://placekitten.com/" + this.props.width + "/" + this.props.height + "?image=" + this.props.id} alt="kitten"/>
        <label className="select-box" htmlFor={"picture-" + this.props.id}>
        <input type="checkbox" id={"picture-" + this.props.id} data-picture-id={this.props.id} className="picture-selector" />
          <span>Add to album</span>
        </label>
      </li>
    );
  }
}
