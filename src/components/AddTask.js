import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


class AddTask extends React.Component {  
  state = {
    name: "",
    completed: false,
  }

  add = (e) => {
    e.preventDefault();
    if(this.state.name == "") {
      alert("Введите задачу");
      return
    }
    this.props.addTaskHandler(this.state);
    this.setState({name:""});
    console.log(this.state);
  };
  render() {  
    return (
      <div className="ui main">
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Task</label>
            <input 
            type="text" 
            name="Task" 
            placeholder="Task" 
            value={this.state.name}
            onChange={(e) => this.setState({name:e.target.value})}/>
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddTask;
