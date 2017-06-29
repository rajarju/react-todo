import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

class TodoList extends React.Component {

  constructor() {
    super();
    this.state = {
      items: [],
      isLoading: false,
      hasErrored: false
    };
  }

  fetchData(url) {
    this.setState({ isLoading: true })

    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      this.setState({ isLoading: false });
      return response;
    })
    .then((response) => response.json())
    .then((items) => this.setState({items}))
    .catch(() => this.setState({ hasErrored : true}));
  }

  componentDidMount() {
    this.fetchData('https://5954e3922374e400111e4785.mockapi.io/todo')
    // let items = this.state.items;
    // this.setState({
    //   items : this.sortItems(items)
    // });
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
    var items = this.state.items;
    if (this.state.hasErrored) {
      return <p> There was an Error! </p>;
    }

    if (this.state.isLoading) {
      return <p> Loading </p>;
    }

    return (
      <div>
        <div className="App__Todo--container container-shadow">
          { items.map(
            item =>
            <TodoItem key={item.id} item={item} toggle={this.toggleItem.bind(this)} />
          ) }
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

export default TodoList;
