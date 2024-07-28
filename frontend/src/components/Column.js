import React from 'react';
import Task from './Task';
import './Column.css';

const Column = ({ columnTitle, tasks, onUpdateTask, onDeleteTask, currentStatus}) => {
  return (
    <div className="column">
      <div className="column-header">
        <h3>{columnTitle}</h3>
      </div>
      <div className="column-tasks">
      {tasks.map(task => (
                <Task 
                key={task.id} 
                task={task} 
                onUpdateTask={onUpdateTask} 
                currentStatus={currentStatus}
                onDeleteTask={onDeleteTask} />
            ))}
      </div>
    </div>
  );
};

export default Column;