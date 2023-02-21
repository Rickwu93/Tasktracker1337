import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import AddTask from "./component/AddTask";
import ToDo from "./component/ToDo";


function App() {
  const [taskList, setTaskList] = useState([]);
  //completed state for drag n drop
  const [completed, setCompleted] = useState([])
  //preload the saved localstorage of tasks
  useEffect(() => {
    let array = localStorage.getItem("taskList");

    if(array) {
      setTaskList(JSON.parse(array))
    }
  }, [])
//adding task to completed task array on drop
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addToCompleted(item.id, item.projectName, item.taskDescription, 
      item.timestamp, item.duration),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))

  const addToCompleted = (id, projectName, taskDescription, timestamp,
    duration) => {
      const moveTask = taskList.filter((task) => id === task.id);
      setCompleted((completed) => [...completed, {moveTask,
      projectName, taskDescription, timestamp, duration}])
  }

  return (
    <>
      <h1 className="text-2xl font-bold py-6 pl-6">Task Tracker</h1>
      <p className="text-xl pl-6">Hello testing</p>
      <div className="flex flex-row items-center">
      <p className="text-xl pl-6">Click</p> 
        <AddTask taskList={taskList} setTaskList={setTaskList} />
      <p className="text-xl my-2">to add a new task</p>
      </div>
      <div className="flex flex-row">
        <div className="w-full">
        <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg 
        my-4 py-1 px-2 bg-gray-200">To Do:</h2>
      {taskList.map((task, i) =>
        <ToDo key={i} task={task} index={i} taskList={taskList} 
        setTaskList={setTaskList} />
      )}
      </div>
      <div className="w-full flex flex-col" ref={drop}>
      <h2 className="text-xl font-semibold w-3/4 max-w-lg 
        my-4 py-1 px-2 bg-gray-200">Completed:</h2>
        {completed.map((task, i) =>
        <ToDo key={i} task={task} taskList={taskList} 
        setTaskList={setTaskList} />
      )}
      </div>
      </div>
    </>
  );
} 

export default App;
