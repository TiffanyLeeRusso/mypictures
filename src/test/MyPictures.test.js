import React from 'react';
import ReactDOM from 'react-dom';
import MyPictures from './MyPictures';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyPictures />, div);
});
