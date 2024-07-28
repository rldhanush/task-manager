// src/pages/Manager.js
import React from 'react';
/** 
 * import SearchBar from '../components/SearchBar';
 */
import Column from '../components/Column';
import './Manager.css';

const Manager = () => {
    const todoTasks = [
        { title: 'Task 1', description: 'Description 1', createdAt: '01/01/2024, 10:00:00' },
        { title: 'Task 2', description: 'Description 2', createdAt: '01/02/2024, 11:00:00' },
        { title: 'Task 3', description: 'Description 3', createdAt: '01/03/2024, 12:00:00' }
    ];

    const inProgressTasks = [
        { title: 'Task 4', description: 'Description 4', createdAt: '01/04/2024, 13:00:00' },
        { title: 'Task 5', description: 'Description 5', createdAt: '01/05/2024, 14:00:00' }
    ];

    const doneTasks = [
        { title: 'Task 6', description: 'Description 6', createdAt: '01/06/2024, 15:00:00' }
    ];

    return (
        <div className="manager">
            <button className="add-task-btn">Add Task</button>
            
            {/* 
                <SearchBar 
                    onSearch={(value) => console.log(value)} 
                    onSort={(value) => console.log(value)} 
                /> 
            */}
            <div className="columns">
                <Column columnTitle="TODO" tasks={todoTasks} />
                <Column columnTitle="IN PROGRESS" tasks={inProgressTasks} />
                <Column columnTitle="DONE" tasks={doneTasks} />
            </div>
        </div>
    );
};

export default Manager;