import React from 'react';
import './TodoItem.css';
import {Link} from 'react-router-dom';


class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {props};
  }

  toggleItem() {
    this.props.toggle(this.props.item.id)
  }

  deleteItem() {

  }

  render() {
    var item = this.props.item;
    return (
      <div className={"TodoItem " + (item.done ? "TodoItem--done" : "")}>
        <Link className="TodoItem--text" to={ `/todo/${item.id}` }>{item.value}</Link>
        <div className="TodoItem__Actions">
          <input type="checkbox" checked={item.done}
          onChange={this.toggleItem.bind(this)}
          className="TodoItem__Actions__Action"/>

          <button onClick={this.deleteItem.bind(this)}
          className="TodoItem__Actions__Action">Delete</button>
        </div>
      </div>
    );
  }
}


class TodoItemPage extends React.Component {
  constructor(params) {
    super(params);
    let match = params.match;
    this.state = {
      itemId : match.params.itemId
    };
  }

  componentWillMount() {
    let item = {
      id : this.state.itemId,
      value : 'Dynamic Item',
      description: 'Some Large Description of the todo Item',
      done: false
    };
    this.setState({ item })
  }

  toggleItem() {
    let item = this.item;
    item.done = !item.done;
    this.setState({
      item
    });
  }
  

  deleteItem() {

  }

  render() {
    var item = this.state.item;
    return (
      <div>
        <Link to={ `/` }><span>Back</span></Link>
        <div className={"TodoItem " + (item.done ? "TodoItem--done" : "")}>
          <Link className="TodoItem--text" to={ `/todo/${item.id}` }>{item.value}</Link>
          <div className="TodoItem__Actions">
            <input type="checkbox" checked={item.done}
            onChange={this.toggleItem.bind(this)}
            className="TodoItem__Actions__Action"/>
            <button onClick={this.deleteItem.bind(this)}
            className="TodoItem__Actions__Action">Delete</button>
          </div>          
        </div>
        <div>
            {item.description}
        </div>
      </div>
    );
  }
}

exports.TodoItemPage = TodoItemPage;
export default TodoItem;
