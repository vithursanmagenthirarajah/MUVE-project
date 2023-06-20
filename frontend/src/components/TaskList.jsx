import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);

  useEffect(() => {
    // Fetch tasks data from API
    axios.get('http://localhost:5000/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  console.log(tasks)
  useEffect(() => {
    // Filter tasks based on due date
    if (dueDateFilter) {
      const filtered = tasks.filter((task) =>
        task.dueDate && task.dueDate.includes(dueDateFilter)
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, dueDateFilter]);
  
  // useEffect(() => {
  //   // Filter tasks based on search query
  //   if (searchQuery) {
  //     const filtered = tasks.filter((task) =>
  //       task.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setFilteredTasks(filtered);
  //   } else {
  //     setFilteredTasks(tasks);
  //   }
  // }, [tasks, searchQuery]);

  useEffect(() => {
    // Filter tasks based on search query
    if (searchQuery) {
      const filtered = tasks.filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, searchQuery]);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      axios.get(`http://localhost:5000/search?name=${trimmedQuery}`)
        .then((response) => {
          setFilteredTasks(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setFilteredTasks(tasks);
    }
  };

  // Pagination Logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>

      <div className="flex items-center mb-4">
        {/* <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 mr-2"
          placeholder="Search by task name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}

      <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 mr-2"
          placeholder="Search by task name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>



        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 mr-2"
          placeholder="Filter by due date"
          value={dueDateFilter}
          onChange={(e) => setDueDateFilter(e.target.value)}
        />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Name</th>
            <th>Date</th>
            <th>Task</th>
            <th>Task Due Date</th>
            <th>Task Status</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.companyName}</td>
              <td>{task.name}</td>
              <td>{task.date}</td>
              <td>{task.tasks}</td>
              <td>{task.taskDueDate}</td>
              <td>{task.taskStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4">
        <ul className="pagination">
          {Array.from(Array(Math.ceil(filteredTasks.length / tasksPerPage)), (e, i) => {
            const pageNumber = i + 1;
            return (
              <li
                key={pageNumber}
                className={`page-item${pageNumber === currentPage ? ' active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
