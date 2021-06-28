import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from '../api/task';
import List from './List';
import AddTask from './AddTask';
import'./App.css';
import { render } from 'react-dom';

function App() {

  const LOCAL_STORAGE_KEY="tasks";
  const [tasks, setTasks] = useState([]);

  const retriveTasks = async () => {
    const response = await api.get("/task")
    return response.data;
  };

  const addTaskHandler = async (task) => {
    console.log(task);
    const request = {
      id: uuid(),
      ...task
    }
    const response = await api.post("/task", request);
    setTasks([...tasks, response.data]);
  };

  const removeTaskHandler = async (id) => {
    await api.delete(`/task/${id}`);
    const newTaskList = tasks.filter((task) => {
      return task.id !==id;
    });

    setTasks(newTaskList);
  };

  const changeTaskHandler = async (task) => {
    task.completed = !task.completed;
    const response = await api.put(`/task/${task.id}`, task);
    const { id, name, completed} = response.data;
    setTasks(
      tasks.map((task) => {
        console.log(task);
        return task.id === id ? { ...response.data } : task;
      })
    );
  };
  useEffect(() => {
    /* const retriveTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retriveTasks) setTasks(retriveTasks); */

    const getAllTask = async () => {
      const allTask = await retriveTasks();
      if(allTask) setTasks(allTask);
    };
    getAllTask();
  }, []);

  useEffect(() => {
    /* localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks)); */
    
  }, [tasks]);
  
  return (
    <div className="ui container">
      <AddTask addTaskHandler={addTaskHandler}></AddTask>
      <List tasks={tasks} getTaskId={removeTaskHandler} changeTaskHandler = {changeTaskHandler}></List>
      
    </div>
  );
  
}


export default App;
