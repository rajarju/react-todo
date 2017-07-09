import React from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../../actions/TodoList/TodoList.js';

import TodoItem from '../TodoItem/TodoItem';

class TodoList extends React.Component {

  componentDidMount() {
    this.props.fetchData('https://5954e3922374e400111e4785.mockapi.io/todo')
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
    var items = this.props.items;
    if (this.props.hasErrored) {
      return <p> There was an Error! </p>;
    }

    if (this.props.isLoading) {
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

 const mapStateToProps = (state) => {
   return {
     items : state.items,
     hasErrored: state.hasErrored,
     isLoading: state.isLoading
   }
 };


 const mapDispatchToProps = (dispatch) => {
   return {
     fetchData: (url) => dispatch(itemsFetchData(url))
   };
 };


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
