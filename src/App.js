import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";
function App() {
  const [showAddTask, setshowAddTask] = useState(true);

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5100/tasks');
    const data = await res.json();

    return data;
  };

  const getTasks = async () => {
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async id => {
    console.log('Delete ' + id);
    await fetch(`http://localhost:5100/tasks/${id}`, { method: 'DELETE' });
    await getTasks();
  };

  const addTask = async task => {
    console.log('Adding task ' + JSON.stringify(task));

    await fetch(`http://localhost:5100/tasks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify(task)
    });

    await getTasks();
    setshowAddTask(false);
  };

  const toggleReminder = async id => {
    const task = tasks.find(task => task.id === id);
    const updatedTask = { ...task, reminder: !task.reminder };
    console.log('Toggle Reminder ' + JSON.stringify(updatedTask));

    await fetch(`http://localhost:5100/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    await getTasks();
  };

  return (
    <Router>
      <div className="container">
        <Header title="Task Tracker" showAdd={showAddTask} onAddClick={() => setshowAddTask(!showAddTask)} />

        <Routes>
          <Route path='/' element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
              ) : 'No Tasks to show'}
            </>
          } />
          <Route path='/about' element={<About />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
