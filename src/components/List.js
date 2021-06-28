import React from 'react';
import { Link } from "react-router-dom";
import task from '../api/task';
import CardTask from './CardList';


const List = (props) => {
  console.log(props);

  const deleteTaskHandler = (id) => {
    props.getTaskId(id);
  };

  const changeTaskHandler = (task) => {
    props.changeTaskHandler(task);
  };

  const activeTask = props.tasks.filter(task=>task.completed == false);
  const completedTask = props.tasks.filter(task=>task.completed == true);
  const renderList = [...activeTask, ...completedTask].map((task) => {
    return(
      <CardTask task={task} clickHandler = {deleteTaskHandler}  changeHandler={changeTaskHandler} key={task.id} completed={task.completed}>
      </CardTask>
    );
  })
  return(
    <div className="ui celled list">
      {renderList}
    </div>
  );
}

export default List;