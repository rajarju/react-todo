import React from 'react';
import './TodoItem.css';

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
      <div  className={"TodoItem " + (item.done ? "TodoItem--done" : "")}>
        <div className="TodoItem--text">{item.value}</div>
        <div className="TodoItem__Actions">
        <input type="checkbox" checked={item.done} onChange={this.toggleItem.bind(this)} className="TodoItem__Actions__Action"/>
        <button onClick={this.deleteItem.bind(this)} className="TodoItem__Actions__Action">Delete</button>
        </div>
      </div>
    );
  }
}

export default TodoItem;
