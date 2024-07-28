import React from 'react';
import Task from './Task';
import './Column.css';

const Column = ({ columnTitle, tasks }) => {
  return (
    <div className="column">
      <div className="column-header">
        <h3>{columnTitle}</h3>
      </div>
      <div className="column-tasks">
        {tasks.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
