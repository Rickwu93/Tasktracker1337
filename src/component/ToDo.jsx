const ToDo = ({ task }) => {
    return (
        <>
            <div className="flex flex-col items-start justify-start bg-white
            my-4 ml-6 py-4 px-6 w-3/4 max-w-lg">
                <div className="w-full flex flex-row justify-between">
                    <p className="font-semibold text-xl">
                    {task.projectName}</p>
                    <button>Edit</button>
                </div>
                 <p className="text-lg py-2">{task.taskDescription}</p>
                 <div className="w-full flex justify-center">
                    <button className="bg-red-500 text-white text-sm uppercase
                    font-semibold py-1.5 px-3 rounded-lg">Delete</button>
                 </div>
            </div>
        </>
    )
}

export default ToDo;