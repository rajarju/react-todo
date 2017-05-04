import React from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './TodoItem';

let item = {
  id : 1,
  value : 'Test Item',
  done : false
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TodoItem item={item} />, div);
});
