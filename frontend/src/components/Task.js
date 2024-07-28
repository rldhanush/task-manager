import React, { useState } from 'react';
import axios from 'axios';
import EditTask from './EditTask';
import ViewTaskDetails from './ViewTaskDetails';
import './Task.css';

const Task = ({ task, onUpdateTask, currentStatus, onDeleteTask }) => {
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

    const handleSave = async (updatedTask) => {
        try {
            const token = localStorage.getItem('jwt_token');
            const updateData = {
                title: updatedTask.title,
                description: updatedTask.description,
                status: currentStatus // Include the current status
            };
            console.log('Sending PUT request with data:', updateData); 
            const response = await axios.put(
                `http://localhost:5001/api/tasks/updateTask/${task.id}`,
                updateData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                console.log('Task updated successfully');
                onUpdateTask({ ...task, ...updateData }); // Merge updated fields with existing task
                setIsEditing(false);
            } else {
                console.error('Failed to update task:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating task:', error.response ? error.response.data : error.message);
        }
    };

    const handleCloseView = () => {
        setIsViewing(false);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwt_token');
            const response = await axios.delete(
                `http://localhost:5001/api/tasks/deleteTask/${task.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                console.log('Task deleted successfully');
                onDeleteTask(task.id); // Remove task from the list
            } else {
                console.error('Failed to delete task:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    return (
        <div className="task-card">
            <h3>{task.title}</h3>
            <p className='taskDesc'>{task.description}</p>
            <p>Created at: {task.createdAt}</p>
            <div className="task-actions">
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
                <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                <button className="view-details-btn" onClick={handleViewClick}>View Details</button>
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
