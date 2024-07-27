const express = require('express');
const { createTask, getTask, getAllTasks, deleteTask, updateTask, updateTaskStatus} = require('../controllers/taskController');
const { body, param } = require('express-validator'); // Import param for route parameter validation
const router = express.Router();

// Create a new task
router.post(
    '/createTask', 
    [
        body('title').not().isEmpty().trim().escape().withMessage('Title is required'),
        body('description').not().isEmpty().trim().escape().withMessage('Description is required'),
        //status is optional but if provided can be only - todo, in_process, done
        body('status').optional().isIn(['todo', 'in_progress', 'done']).withMessage('Status must be either todo, in_process or done'),
    ], 
    createTask
);

// Get task given: task ID
router.get(
    '/getTask/:taskId',
    [
        param('taskId').notEmpty().withMessage('Task ID is required'),
    ],
    getTask
);

// Get all tasks
router.get(
    '/getTasks',
    getAllTasks
);

// Delete a task given: task ID
router.delete(
    '/deleteTask/:taskId',
    [
        param('taskId').notEmpty().withMessage('Task ID is required'),
    ],
    deleteTask
);

//update task
router.put(
    '/updateTask/:taskId',
    [
        param('taskId').notEmpty().withMessage('Task ID is required'),
    ],
    updateTask
);

// Update Task Status
router.put(
    '/updateTaskStatus/:taskId',
    [
        param('taskId').notEmpty().withMessage('Task ID is required'),
        body('status').notEmpty().withMessage('Status is required').isIn(['todo', 'in_progress', 'done']).withMessage('Status must be either todo, in_progress or done'),
    ],
    updateTaskStatus
);

module.exports = router;
