import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const tasksURI = "http://localhost:5000/tasks/";

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();

      // console.log("tasksFromServer", tasksFromServer);

      setTasks(tasksFromServer);
    };

    getTasks();
  }, [])

  // fetch tasks
  const fetchTasks = async() => {
    const response = await fetch(tasksURI);
    const data = await response.json();

    return data;
  }

// add task
const addTask = async (task) => {
  const response = await fetch(tasksURI, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(task)
  })

  const data = await response.json();

  console.log(data);

  setTasks([...tasks, data]);
    
  // console.log(task);

  // const id = Math.floor(Math.random() * 10000 + 1);
  // // console.log(id);

  // const newTask = { id, ...task };
  // // console.log(newTask);
  // setTasks([...tasks, newTask]);
}

// delete task
const deleteTask = async (id) => {
  console.log("delete", id);

  await fetch(tasksURI + id, {
    method: "DELETE"
  })

  setTasks(tasks.filter((task) => task.id !== id));
}

// fetch task
const fetchTask = async (id) => {
  const response = await fetch(tasksURI + id);
  const data = await response.json();

  return data;
}

// toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id);
  const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
  console.log("toggleReminder", id);

  const response = await fetch(tasksURI + id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(updatedTask)
  });

  const data = await response.json();

  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder } : task));
}


  return (
    <Router>
      <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      <Route path="/" exact render={(props) => (
        <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No tasks"}
        </>
      )}/>
      <Route path="/about" component={About}/>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
