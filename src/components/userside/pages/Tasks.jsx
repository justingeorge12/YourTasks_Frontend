import { data, useLocation, useNavigate } from "react-router-dom"
import api from "../../../services/api"
import { useEffect, useRef, useState } from "react"
import AddTask from "./Modal/AddTask"
import CommonModal from "./Modal/CommonModal"

function Tasks() {

    const navigate = useNavigate()
    const location = useLocation()
    const project_id = location.state?.project_id

    const [project, setProject] = useState({})
    const [addTasksModal, setAddTasksModal] = useState(false)
    const [tasks, setTasks] = useState([])
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteTaskId, setDeleteTaskId] = useState(null)
    const [deleteModal, setDeleteModal ] = useState(false)


    const socket = useRef(null);

        useEffect(() => {
            // socket.current = new WebSocket('ws://localhost:8000/ws/tasks/');
            
            socket.current = new WebSocket('ws://yourtask.justingeorge.site/ws/tasks/');


            socket.current.onopen = () => {
                console.log('WebSocket connected');
            };

            socket.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const newTask = data.task;
                setTasks((prevTasks) => [...prevTasks, newTask]);
            };

            socket.current.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            socket.current.onclose = (event) => {
                if (event.wasClean) {
                    console.log('WebSocket closed cleanly');
                } else {
                    console.error('WebSocket closed unexpectedly');
                }
            };

            return () => {
                socket.current.close();
            };
        }, []); 

        
    // useEffect(() => {
    //     console.log('heyyyyy')
    //     // Establish WebSocket connection
    //     const socket = new WebSocket('ws://localhost:8000/ws/tasks/');
    
    //     // Log when the connection is successfully established
    //     socket.onopen = () => {
    //         console.log('WebSocket connection establishedddd');
    //     };
    
    //     // Handle incoming messages
    //     socket.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         console.log('new daaata')
    //         const newTask = data.task;
    //         setTasks((prevTasks) => [...prevTasks, newTask]);
    //     };
    
    //     // Handle connection errors
    //     socket.onerror = (error) => {
    //         console.error('WebSocket error:', error);
    //     };
    
    //     // Log when the connection is closed
    //     socket.onclose = (event) => {
    //         if (event.wasClean) {
    //           console.log('WebSocket closed cleanly');
    //         } else {
    //           console.error('WebSocket closed unexpectedly');
    //         }
    //       };
    
    //     return () => {
    //         socket.close(); // Clean up the WebSocket connection when the component unmounts
    //     };
    // }, []);
    





    const STATUS_CHOICES = [
        "In progress",
        "Pending Deploy",
        "Done",
        "Stuck",
    ];

    const fetchProject = async () => {
        try {
            const res = await api.get(`/projects/${project_id}`)
            console.log(res)
            setProject(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const fetchTasks = async () => {
        try{
            const res = await api.get(`/listtasks/${project_id}`)
            console.log(res)
            setTasks(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProject()
        fetchTasks()
    }, [])

    const handleEditTasks = (data) => {
        setTaskToEdit(data)
        setEditModalOpen(true)
    }

    const handleDelete = (deleteId) => {
        setDeleteTaskId(deleteId)
        setDeleteModal(true)
    }

    const handleDeleteTask = async () => {
        try{
            const res = await api.delete(`/tasks/${deleteTaskId}/`)
            setDeleteModal(false)
            fetchTasks()
        }catch (err) {
            console.log(err)
        }
    }

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const res = await api.patch(`/tasks/${taskId}/`, { status: newStatus });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                )
            );
            setEditingTaskId(null);
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    return(
        <div>
            <div className="flex justify-center mt-10">
                <h1 className="text-2xl font-semibold">Project : {project?.name}</h1>
            </div>
            <div className="right-0 absolute mr-10">
                <button onClick={() => setAddTasksModal(true)} className="border border-lime-400 rounded-md px-2 py-1"> Add Tasks </button>
            </div>
            <div className="ml-10 absolute">
                <button onClick={() => navigate('/taskanalysis', {state:{project_id:project.id}})} className="border border-orange-500 rounded-md px-2 py-1"> task analysis</button>
            </div>
            <div className="mx-28 mt-10">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-sm uppercase border-b border-slate-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">Id</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Date created</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((data, index) => (
                            <tr key={data.id} className="border-b border-slate-700">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap"> {data.id}</th>
                            <td className="px-6 py-4 cursor-pointer">{data.name}</td>
                            <td className="px-6 py-4">{data.created_at ? data.created_at.slice(0, 10) : 'N/A'}</td>
                            <td className="px-6 py-4 cursor-pointer">
                                {editingTaskId === data.id ? (
                                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} onBlur={() => handleStatusChange(data.id, selectedStatus)} className="border border-slate-600 rounded-md">
                                        <option value="" disabled>
                                            Select Status
                                        </option>
                                        {STATUS_CHOICES.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span onClick={() => {
                                        setEditingTaskId(data.id);
                                        setSelectedStatus(data.status);
                                    }}>
                                        {data.status}
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleEditTasks(data)} className="border px-2 py-1 mr-2">Edit</button>
                                <button onClick={()=> handleDelete(data.id)} className="border px-2 py-1 ml-2">Delete</button>
                            </td>   
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {addTasksModal && <AddTask onClose={() => setAddTasksModal(false)} fetchTasks={fetchTasks} project_id={project_id} socket={socket.current}/>}
            {editModalOpen && <AddTask onClose={() => setEditModalOpen(false)} fetchTasks={fetchTasks} taskToEdit={taskToEdit} project_id={project_id} />}
            {deleteModal && <CommonModal onClose={() => setDeleteModal(false)} message={'delete the Task'} func={handleDeleteTask}/>}
        </div>
    )
}

export default Tasks