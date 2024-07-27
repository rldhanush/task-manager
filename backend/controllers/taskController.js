const admin = require('firebase-admin');
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;
const { validationResult } = require('express-validator');


// Create a new task
const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const newTaskRef = db.collection('tasks').doc();
        // Add this taskID to the status collection's tasks array (skip if already present)
        const newTaskStatus = status || 'todo';
        // create new task - default status if status is not provided will be 'todo'
        const newTask = {
            title,
            description,
            status: newTaskStatus,
            createdAt: new Date().toISOString()
        };
        await newTaskRef.set(newTask);
        
        // Check if the status exists in the status collection
        const statusRef = db.collection('status').doc(newTaskStatus);
        const statusDoc = await statusRef.get();
        const statusData = statusDoc.data();
        if (!statusData.tasks.includes(newTaskRef.id)) {
            await statusRef.update({
                tasks: FieldValue.arrayUnion(newTaskRef.id)
            });
        }

        return res.status(201).json({ message: 'Task created successfully', taskId: newTaskRef.id });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get task given: task ID 
const getTask = async ( req, res ) => {
    const { taskId } = req.params;
    try {
        //Get task document from Firestore 
        const doc = await db.collection('tasks').doc(taskId).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const task = doc.data();
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all tasks

const getAllTasks = async (req, res) => {
    try {
        const snapshot = await db.collection('tasks').get();
        const tasks = 
        snapshot.
        docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json({ tasks });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete task given task ID
const deleteTask = async (req,res) => {
    const {taskId} = req.params;
    try{
        const taskRef = db.collection('tasks').doc(taskId);
        if (!taskRef) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const task = await taskRef.get();
        const taskData = task.data();

        //delete task from Firestore
        await taskRef.delete();

        // Remove this taskID from the status collection's tasks array
        const statusRef = db.collection('status').doc(taskData.status);
        await statusRef.update({
            tasks: FieldValue.arrayRemove(taskId)
        });

        res.status(200).json({ message: 'Task deleted successfully' });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update task - when edit button is pressed 
const updateTask = async (req, res) => {
    const {taskId} = req.params;
    const {title, description, status} = req.body;

    //validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const taskRef = db.collection('tasks').doc(taskId);
        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const taskData = taskDoc.data();
        const oldStatus = taskData.status;

        //update task in Firestore
        await taskRef.update({
            title,
            description,
            status
        });

        //update status collection if status has changed
        if (status !== oldStatus) {
            const oldStatusRef = db.collection('status').doc(oldStatus);
            await oldStatusRef.update({
                tasks: FieldValue.arrayRemove(taskId)
            });

            const newStatusRef = db.collection('status').doc(status);
            await newStatusRef.update({
                tasks: FieldValue.arrayUnion(taskId)
            });
        }

        res.status(200).json({ message: 'Task updated successfully' });

    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//update task status and status collection respectively - given task ID and new status
const updateTaskStatus = async (req, res) => {
    const {taskId} = req.params;
    const newStatus = req.body.status;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const taskRef = db.collection('tasks').doc(taskId);
        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const oldStatus = taskDoc.data().status;
        // console.log('old status', oldStatus);
        // console.log('new status', newStatus);

        //update task's status to newStatus in Firestore
        await taskRef.update({
            status: newStatus
        });
        
        //update status collection
        const oldStatusRef = db.collection('status').doc(oldStatus);
        await oldStatusRef.update({
            tasks: FieldValue.arrayRemove(taskId)
        });
        // add task to new status collection
        const newStatusRef = db.collection('status').doc(newStatus);
        await newStatusRef.update({
            tasks: FieldValue.arrayUnion(taskId)
        });

        res.status(200).json({ message: 'Task status updated successfully' });

    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTask, getTask, getAllTasks, deleteTask, updateTask, updateTaskStatus };
