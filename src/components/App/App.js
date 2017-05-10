import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import TodoList from '../TodoList/TodoList';
import {TodoItemPage} from '../TodoItem/TodoItem';
import './App.css';

class App extends React.Component {

  render() {
    return(
      <Router>
          <div className="App">
            <h1 className="App__Title">Todo App</h1>
            <Route exact={true} path="/" component={TodoList} />
            <Route path="/todo/:itemId" render={ ( {match} ) => (
              <TodoItemPage match={match} />
            ) }>
              
            </Route>          
          </div>
      </Router>
    );
  }
}

  export default App
