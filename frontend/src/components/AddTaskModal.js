import React, { useState } from 'react';
import './AddTaskModal.css';

const AddTaskModal = ({ show, onClose, onAddTask }) => {
    const [taskData, setTaskData] = useState({ title: '', description: '' });

    const handleChange = (e) => {
        setTaskData({
            ...taskData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask(taskData);
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        value={taskData.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Task Description"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Add Task</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
