import React, { useState } from 'react';
import EditTask from './EditTask';
import ViewTaskDetails from './ViewTaskDetails';
import './Task.css';

const Task = ({ task }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isViewing, setIsViewing] = useState(false);

    const handleViewClick = () => {
        setIsViewing(true);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleClose = () => {
        setIsEditing(false);
    };

    const handleSave = (updatedTask) => {
        console.log('Task saved:', updatedTask);
        // Implement save logic here
    };

    const handleCloseView = () => {
        setIsViewing(false);
    };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p className='taskDesc'>{task.description}</p>
      <p>Created at: {task.createdAt}</p>
      <div className="task-actions">
        <button className="delete-btn">Delete</button>
        <button className="edit-btn" onClick={handleEditClick}>Edit</button>
        <button className="view-details-btn" onClick= {handleViewClick}>View Details</button>
      </div>
      {isEditing && 
                <EditTask 
                    task={task} 
                    onClose={handleClose} 
                    onSave={handleSave} 
                />
            }
            {isViewing && 
                <ViewTaskDetails 
                    task={task} 
                    onClose={handleCloseView} 
                />
            }
    </div>
  );
};

export default Task;
