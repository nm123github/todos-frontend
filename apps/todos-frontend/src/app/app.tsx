// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Task = {
  id: string;
  name: string;
  status: 'in_progress' | 'completed';
  dateCreated: string;
};

const API_URL = process.env.NX_TODO_BACKEND_HOST || 'http://localhost:8080'; // Endpoint URL

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>('');

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/task`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (taskName.trim() === '') return;

    const newTask = { name: taskName };

    try {
      const response = await axios.post(`${API_URL}/task`, newTask, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTaskName('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Mark task as complete
  const markTaskAsCompleted = async (id: string) => {
    try {
      const response = await axios.put(`${API_URL}/task/${id}`, null, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.message === 'Task marked as complete') {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, status: 'completed' } : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/task/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.message === 'Task deleted') {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Todos App</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter task name"
            className="flex-grow p-2 border border-gray-300 rounded"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        <ul className="space-y-4">
          {tasks.length === 0 && (
            <li className="text-center text-gray-500">No tasks available.</li>
          )}
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-4 border border-gray-300 rounded"
            >
              <div>
                <p
                  className={`text-lg ${
                    task.status === 'completed'
                      ? 'line-through text-gray-400'
                      : ''
                  }`}
                >
                  {task.name}
                </p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(task.dateCreated).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => markTaskAsCompleted(task.id)}
                  disabled={task.status === 'completed'}
                  className={`px-4 py-2 text-white rounded ${
                    task.status === 'completed'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  Complete
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
