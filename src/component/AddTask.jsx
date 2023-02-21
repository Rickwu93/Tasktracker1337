import { useState } from "react";
//opening views for adding new task
const AddTask = ({ taskList, setTaskList }) => {
  const [addModal, setAddModal] = useState(false);
//setting project name and task description
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
//error handling to adding blank tasks
  const [errorMessage, setErrorMessage] = useState("");

//handling name/description inputs on the form
  const handleInput = e => {
    // const name = e.target.name;
    // const value = e.target.value;
    const { name, value } = e.target;
    if (name === "projectName") { 
      setProjectName(value);  
      setErrorMessage(""); //no error if project name is present(value)
    }
    //error handling empty names
    if (name === "projectName" && value === "") {
      setErrorMessage("Enter project name to continue");
    }
    if (name === "taskDescription") setTaskDescription(value)
  }


  //when add task button is clicked we need to close the box
  const handleAdd = e => {
    e.preventDefault();
    if (!projectName) {
      setErrorMessage("Enter project name to continue")
    } else {
      let timestamp = new Date();
      //making a temp list and pushing tasks in
      let tempList = taskList;
      tempList.push({
        projectName, 
        taskDescription,
        timestamp: timestamp,
        duration: 0
      })
      //creating a localstorage to save the tempList
      localStorage.setItem("taskList", JSON.stringify(tempList))
      window.location.reload()
      setAddModal(false)
      setProjectName("");
      setTaskDescription("");
    }
  }

  return (
    <>
      <button
        className="bg-blue-500 text-white uppercase text-sm 
            font-semibold py-1 mx-1.5 pl-2 pr-2.5 rounded hover:opacity-70"
        type="button"
        //when button is clicked we set the modal to true
        onClick={() => setAddModal(true)}
      >
        +New
      </button>
      {addModal ? (
        <>
          <div
            className="flex items-center justify-center overflow-x-hidden
            overflow-y-auto fixed inset-0 z-100">
            <div className="w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col">
            <div className="flex flex-row justify-between p-5 border-b border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add New Task</h3>
              <button
                className="px-1 text-gray-400 float-right text-3xl
                leading-none font-semibold block"
                onClick={() => setAddModal
                    (false)}
              >
                x
              </button>
            </div>
            <form className="px-6 pt-6 pb-4">
                <div>
                <label className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2
                block"
                htmlFor="project-name">
                    Task Description
                </label>
                <input 
                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 
                    rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    id="project-name"
                    name="projectName"
                    type="text"
                    placeholder="Project name"
                    value={projectName}
                    onChange={handleInput}
                    required
                />
                <p className="text-red-500 text-center mt-2 mb-5">
                  {errorMessage}</p>
                </div>
                <div>
                    <label className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2
                block"
                htmlFor="project-name">
                    Task Description
                    </label>
                    <textarea
                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 
                    rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                        id="task-description"
                        name="taskDescription"
                        rows="5"
                        placeholder="Task description"
                        value={taskDescription}
                        onChange={handleInput}
                    />
                </div>
            </form>
            <div>
              <button></button>
            </div>
            <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                <button className="bg-blue-500 text-white font-semibold uppercase text-sm
                px-6 py-3 rounded hover:opacity-70"
                onClick={handleAdd}
                >
                    Add Task
                </button>
            </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddTask;
