import React from 'react';
import task from '../api/task';


const CardTask = (props) => {
    const {id, name, completed} = props.task;
    return(
        <div className="item">
        <input type="checkbox"  checked={completed} onChange={()=>props.changeHandler(props.task)}/>
        <div className="content">
          <div>
            {name}
          </div>
        </div>
        <i className="trash alternate outline icon" 
          style={{color: "red", marginTop: "7px"}}
          onClick={()=>props.clickHandler(id)}
          ></i>
      </div>
    );
};

export default CardTask;