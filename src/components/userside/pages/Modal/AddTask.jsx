// import { useEffect, useState } from "react";
// import Projects from "../Projects";
// import api from "../../../../services/api";
// import toast from "react-hot-toast";

// function AddTask({onClose, taskToEdit, fetchTasks, project_id}) {

//     const [name, setName] = useState('')
//     const [error, setError] = useState("");

//     useEffect(() => {
//             if (taskToEdit) {
//               setName(taskToEdit.name); 
//             }
//           }, [taskToEdit]);
    
//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         if (!name.trim()) {
//             setError("Task name cannot be empty.");
//             return;
//         }

//         try {
//             if (taskToEdit) {
//                 try{
//                     const res = await api.patch(`/tasks/${taskToEdit.id}/`, { name });
//                     toast.success('task updated successfully');
//                     onClose();
//                     fetchTasks()
//                 }
//                 catch(err) {
//                     console.log(err)
//                     if (err.status === 400 ){
//                         if (err.response.data?.non_field_errors?.[0] === "The fields project, name must make a unique set."){
//                             console.log(err)
//                             toast.error('task name is already exists')
//                         } 
//                         else{
//                             toast.error('there is some issue, please try again after sometime')
//                         }
//                     }

//                 }
//             } 
//             else {
//                 console.log(project_id, 'roooooooo')
//                 try{
//                     const res = await api.post(`/tasks/`, {project:project_id, name });
//                     toast.success('task is created successfully')
//                     onClose();
//                     fetchTasks()
//                 }
//                 catch(err) {
//                     console.log(err)
//                     if (err.status === 400 ){
//                         if (err.response.data?.non_field_errors?.[0] === "The fields project, name must make a unique set."){
//                             console.log(err)
//                             toast.error('task name is already exists')
//                         } 
//                         else{
//                             toast.error('there is some issue, please try again after sometime')
//                             onClose()
//                         }
//                     }
//                     else{
//                         toast.error('there is some issue, please try again after sometime')
//                         onClose()
//                     }
//                 }
                
//             }
            
//         }
//         catch (err) {
//             console.log(err)
//             setError("Failed to add tasks. Please try again.");
//         }
        
//     }
//     return(
//         <div className='fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50 p-10'>
//             <div className="relative bg-black m-10 mx-14 border border-slate-600 rounded-md p-6 scroll-auto w-[400px]">
//                 <h1 className="text-2xl font-bold text-center mb-6 text-slate-400">{taskToEdit ? 'Edit Task':'Add Task'}</h1>
//                 <div className="absolute top-4 right-4 bg-slate-800 rounded-md px-2 hover:text-red-600" >
//                     <button onClick={() => onClose()} > ✕ </button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="">
//                         <label className="block text-sm font-medium text-gray-600">Task Name</label>
//                         <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value); setError("");}}  className="block w-full px-4 py-2 mt-1 border border-slate-600 rounded-md  focus:outline-none focus:border-blue-900" />
//                         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//                     </div>
//                     <div className="flex justify-center mt-6">
//                         <button type="submit" className="px-6 py-2 font-bold bg-fuchsia-300 rounded-md w-full hover:bg-fuchsia-400">Submit</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default AddTask



import { useEffect, useState } from "react";
import api from "../../../../services/api";
import toast from "react-hot-toast";

function AddTask({ onClose, taskToEdit, fetchTasks, project_id, socket }) {
    const [name, setName] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        if (taskToEdit) {
            setName(taskToEdit.name);
        }
    }, [taskToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Task name cannot be empty.");
            return;
        }

        try {
            if (taskToEdit) {
                try {
                    const res = await api.patch(`/tasks/${taskToEdit.id}/`, { name });
                    toast.success('Task updated successfully');
                    onClose();
                    fetchTasks();
                    // Emit updated task via WebSocket
                    socket.send(JSON.stringify({ type: 'task_updated', task: res.data }));
                } catch (err) {
                    console.log(err);
                    if (err.status === 400) {
                        if (err.response.data?.non_field_errors?.[0] === "The fields project, name must make a unique set.") {
                            toast.error('Task name already exists');
                        } else {
                            toast.error('There is an issue, please try again later');
                        }
                    }
                }
            } else {
                try {
                    const res = await api.post(`/tasks/create_task/`, { project: project_id, name });
                    toast.success('Task created successfully');
                    onClose();
                    fetchTasks();
                    // Emit new task via WebSocket
                    socket.send(JSON.stringify({ type: 'task_created', task: res.data }));
                } catch (err) {
                    console.log(err);
                    if (err.status === 400) {
                        if (err.response.data?.non_field_errors?.[0] === "The fields project, name must make a unique set.") {
                            toast.error('Task name already exists');
                        } else {
                            toast.error('There is an issue, please try again later');
                        }
                    } else {
                        toast.error('There is an issue, please try again later');
                    }
                }
            }
        } catch (err) {
            console.log(err);
            setError("Failed to add task. Please try again.");
        }
    };

    return (
        <div className='fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50 p-10'>
            <div className="relative bg-black m-10 mx-14 border border-slate-600 rounded-md p-6 scroll-auto w-[400px]">
                <h1 className="text-2xl font-bold text-center mb-6 text-slate-400">{taskToEdit ? 'Edit Task' : 'Add Task'}</h1>
                <div className="absolute top-4 right-4 bg-slate-800 rounded-md px-2 hover:text-red-600" >
                    <button onClick={() => onClose()} > ✕ </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-600">Task Name</label>
                        <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value); setError(""); }} className="block w-full px-4 py-2 mt-1 border border-slate-600 rounded-md  focus:outline-none focus:border-blue-900" />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="px-6 py-2 font-bold bg-fuchsia-300 rounded-md w-full hover:bg-fuchsia-400">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTask;
