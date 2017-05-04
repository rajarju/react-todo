import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = { items: [
      { id:0, value : 'Todo 1', done: true},
      { id:1, value : 'Todo 2', done: false},
      { id:2, value : 'Todo 3', done: false},
    ] }
  }

  componentDidMount() {
    let items = this.state.items;
    this.setState({
      items : this.sortItems(items)
    });
  }

  sortItems(items) {
    items.sort((a, b) => (b.done === a.done) ? 0  : b.done ? -1 : 1);
    return items;
  }

  toggleItem(id) {
    let items = this.state.items;
    const index = items.findIndex( item => item.id === id)
    items[index].done = !items[index].done;
    this.setState({
      items : this.sortItems(items)
    });
  }

  addTodo(e) {
    if(e.keyCode === 13 && this.refs.newTodo.value !== "") {
      let items = this.state.items;
      const newItem = {
        id : items.length + 1, // Or Random UUID,
        value : this.refs.newTodo.value,
        done : false
      };
      items.push(newItem);
      this.setState({
        items : this.sortItems(items)
      });
      this.refs.newTodo.value = "";
    }

  }

  render() {
    let items = this.state.items;

    return(
      <div className="App">
        <h1 className="App__Title">Todo App</h1>

        <div className="App__Todo--container container-shadow">
          {items.map(item =>
            <TodoItem key={item.id} item={item} toggle={this.toggleItem.bind(this)}></TodoItem>)}
        </div>

        <div className="App__Todo__Form ">
          <textarea ref="newTodo" onKeyUp={this.addTodo.bind(this)}
          placeholder="Add todo" className="App__Todo__Form--input container-shadow"></textarea>
          <p className="App__Todo__Form--description">Hit Enter to submit</p>
        </div>

      </div>
      );
    }
  }

  export default App
