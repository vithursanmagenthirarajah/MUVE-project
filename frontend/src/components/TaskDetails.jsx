import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`/api/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => setTask(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{task.title}</h2>
      <div>
        <p>
          <strong>Company Name:</strong> {task.company}
        </p>
        <p>
          <strong>Name:</strong> {task.name}
        </p>
        <p>
          <strong>Date:</strong> {task.date}
        </p>
        <p>
          <strong>List of tasks assigned:</strong> {task.tasks.join(', ')}
        </p>
        <p>
          <strong>Task Due Date:</strong> {task.dueDate}
        </p>
        <p>
          <strong>Task Status:</strong> {task.status}
        </p>
      </div>
    </div>
  );
}

export default TaskDetails;
