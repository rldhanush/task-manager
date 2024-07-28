// src/components/ViewTaskDetails.js
import React from 'react';
import './ViewTaskDetails.css';

const ViewTaskDetails = ({ task, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Task Details</h2>
                <div className="task-details">
                    <p><strong>Title:</strong> {task.title}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Created At:</strong> {task.createdAt}</p>
                </div>
                <div className="modal-actions">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ViewTaskDetails;
