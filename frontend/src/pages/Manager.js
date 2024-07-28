import SearchBar from '../components/SearchBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Column from '../components/Column';
import AddTaskModal from '../components/AddTaskModal';
import ViewTaskDetails from '../components/ViewTaskDetails';
import './Manager.css';

const Manager = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchedTask, setSearchedTask] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const response = await axios.get('http://localhost:5001/api/tasks/getTasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          const tasks = response.data.tasks;
          const todo = tasks.filter(task => task.status === 'todo');
          const inProgress = tasks.filter(task => task.status === 'in_progress');
          const done = tasks.filter(task => task.status === 'done');

          setTodoTasks(todo);
          setInProgressTasks(inProgress);
          setDoneTasks(done);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const response = await axios.post('http://localhost:5001/api/tasks/createTask', {
        title: newTask.title,
        description: newTask.description
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setTodoTasks([
          ...todoTasks,
          { ...newTask, id: response.data.taskId, createdAt: new Date().toLocaleString(), status: 'todo' }
        ]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  const handleUpdateTask = (updatedTask) => {
    const updateTaskList = (tasks) =>
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));

    setTodoTasks(updateTaskList(todoTasks));
    setInProgressTasks(updateTaskList(inProgressTasks));
    setDoneTasks(updateTaskList(doneTasks));
  };

  const handleDeleteTask = (taskId) => {
    const filterTaskList = (tasks) =>
      tasks.filter(task => task.id !== taskId);

    setTodoTasks(filterTaskList(todoTasks));
    setInProgressTasks(filterTaskList(inProgressTasks));
    setDoneTasks(filterTaskList(doneTasks));
  };

  const handleSearch = (query) => {
    const allTasks = [...todoTasks, ...inProgressTasks, ...doneTasks];
    const foundTask = allTasks.find(task => task.title.includes(query));

    if (foundTask) {
      setSearchedTask(foundTask);
      setIsViewing(true);
      setSearchError('');
    } else {
      setSearchedTask(null);
      setIsViewing(false);
      setSearchError('No results found');
    }
  };

  const handleSort = (sortBy) => {
    const sortTasks = (tasks) => {
      return [...tasks].sort((a, b) => {
        if (sortBy === 'recent') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === 'oldest') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return 0;
      });
    };

    setTodoTasks(sortTasks(todoTasks));
    setInProgressTasks(sortTasks(inProgressTasks));
    setDoneTasks(sortTasks(doneTasks));
  };

  return (
    <div className="manager">
      <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>Add Task</button>
      <AddTaskModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
      <SearchBar
        onSearch={handleSearch}
        onSort={handleSort}
      />
      {searchError &&
        <div className="no-results">
          <p>{searchError}</p>
        </div>
      }
      <div className="columns">
        <Column
          columnTitle="TODO"
          tasks={todoTasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          currentStatus={'todo'}
        />
        <Column
          columnTitle="IN PROGRESS"
          tasks={inProgressTasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          currentStatus={'in_progress'}
        />
        <Column
          columnTitle="DONE"
          tasks={doneTasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          currentStatus={'done'}
        />
      </div>
      {isViewing &&
        <ViewTaskDetails
          task={searchedTask}
          onClose={() => setIsViewing(false)}
        />
      }
    </div>
  );
};

export default Manager;
