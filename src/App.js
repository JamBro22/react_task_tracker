import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';

function App() {
  const [tasks, setTasks] = useState(
    [
        {
            id: 1,
            text: "Doctor's appointment",
            day: "Feb 5th at 2pm",
            reminder: true,
        },
        {
            id: 2,
            text: "Meeting at school",
            day: "Feb 6th at 1pm",
            reminder: true,
        },
        {
            id: 3,
            text: "Food Shopping",
            day: "Feb 5th at 2pm",
            reminder: false,
        },
    ]
);

// delete task
const deleteTask = (id) => {
  console.log("delete", id);

  setTasks(tasks.filter((task) => task.id !== id));
}

// toggle reminder
const toggleReminder = (id) => {
  console.log("toggleReminder", id);

  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder } : task))
}


  return (
    <div className="container">
     <Header />
     {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No tasks"}
    </div>
  );
}

export default App;
