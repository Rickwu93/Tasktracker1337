import { useState } from "react";
import AddTask from "./component/AddTask";
import ToDo from "./component/ToDo";


function App() {
  const [taskList, setTaskList] = useState([]);
  console.log(taskList);

  return (
    <>
      <h1 className="text-2xl font-bold py-6 pl-6">Task Tracker</h1>
      <p className="text-xl pl-6">Hello testing</p>
      <div className="flex flex-row items-center">
      <p className="text-xl pl-6">Click</p> 
        <AddTask taskList={taskList} setTaskList={setTaskList} />
      <p className="text-xl my-2">to add a new task</p>
      </div>
      <div>
        <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg 
        my-4 py-1 px-2 bg-gray-200">To Do:</h2>
      {taskList.slice(0).reverse().map((task, i) =>
        <>
        <ToDo key={new Date().getTime()} task={task} index={i} taskList={taskList} 
        setTaskList={setTaskList} />
        </>
      )}
      </div>
    </>
  );
} 

export default App;
