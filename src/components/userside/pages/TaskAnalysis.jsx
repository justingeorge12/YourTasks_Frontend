
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../services/api";

function TaskAnalysis() {
    const location = useLocation();
    const project_id = location.state?.project_id;

    const [tasks, setTasks] = useState([]);
    

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/listtasks/${project_id}`);
            console.log(res.data);
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const filterTasksByStatus = (status) => {
        return tasks.filter((task) => task.status === status);
    };

    return (
        <div className="p-4">
            <div className="flex justify-center">
                <h1 className="text-2xl font-bold">Analysis</h1>
            </div>
            <div className="flex flex-wrap gap-4 mt-10">
                <div className="flex-1 min-w-[150px] max-w-[250px] p-4 border border-gray-300 bg-gray-100 text-center rounded-lg shadow-md">
                    <h1 className="text-lg font-semibold mb-3">In Progress</h1>
                    {filterTasksByStatus("In progress").map((task) => (
                        <p key={task.id} className="text-sm text-gray-700 my-1">
                            {task.name}
                        </p>
                    ))}
                </div>

                <div className="flex-1 min-w-[150px] max-w-[250px] p-4 border border-gray-300 bg-gray-100 text-center rounded-lg shadow-md">
                    <h1 className="text-lg font-semibold mb-3">Pending</h1>
                    {filterTasksByStatus("Pending").map((task) => (
                        <p key={task.id} className="text-sm text-gray-700 my-1">
                            {task.name}
                        </p>
                    ))}
                </div>

                <div className="flex-1 min-w-[150px] max-w-[250px] p-4 border border-gray-300 bg-gray-100 text-center rounded-lg shadow-md">
                    <h1 className="text-lg font-semibold mb-3">Pending Deploy</h1>
                    {filterTasksByStatus("Pending Deploy").map((task) => (
                        <p key={task.id} className="text-sm text-gray-700 my-1">
                            {task.name}
                        </p>
                    ))}
                </div>

                <div className="flex-1 min-w-[150px] max-w-[250px] p-4 border border-gray-300 bg-gray-100 text-center rounded-lg shadow-md">
                    <h1 className="text-lg font-semibold mb-3">Done</h1>
                    {filterTasksByStatus("Done").map((task) => (
                        <p key={task.id} className="text-sm text-gray-700 my-1">
                            {task.name}
                        </p>
                    ))}
                </div>

                <div className="flex-1 min-w-[150px] max-w-[250px] p-4 border border-gray-300 bg-gray-100 text-center rounded-lg shadow-md">
                    <h1 className="text-lg font-semibold mb-3">Stuck</h1>
                    {filterTasksByStatus("Stuck").map((task) => (
                        <p key={task.id} className="text text-gray-700 my-1">
                            {task.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskAnalysis;




    // const ws = useRef(null);

    // useEffect(() => {
    //     ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/tasks/${project_id}/`);

    //     ws.current.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         if (data.message.action === "updated") {
    //             fetchTasks(); // Refresh tasks when a new update is received
    //         }
    //     };

    //     ws.current.onclose = () => console.log("WebSocket disconnected");

    //     return () => ws.current.close();
    // }, [project_id]);



    // useEffect(() => {
    //     const socket = new WebSocket(`ws://127.0.0.1:8000/ws/tasks/${project_id}/`);
    
    //     socket.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         setTasks((prevTasks) => {
    //             const index = prevTasks.findIndex((task) => task.id === data.id);
    //             if (index >= 0) {
    //                 // Update existing task
    //                 const updatedTasks = [...prevTasks];
    //                 updatedTasks[index] = data;
    //                 return updatedTasks;
    //             } else {
    //                 // Add new task
    //                 return [...prevTasks, data];
    //             }
    //         });
    //     };
    
    //     socket.onclose = () => console.log("WebSocket closed.");
    //     return () => socket.close();
    // }, [project_id]);
    

    // useEffect(() => {
    //     const ws = new WebSocket(`ws://127.0.0.1:8000/ws/project/${project_id}/`);

    //     ws.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         setTasks((prevTasks) => {
    //             const updatedTasks = prevTasks.map((task) =>
    //                 task.id === data.id ? { ...task, ...data } : task
    //             );
    //             return updatedTasks.some((task) => task.id === data.id)
    //                 ? updatedTasks
    //                 : [...prevTasks, data];
    //         });
    //     };

    //     ws.onclose = () => console.log("WebSocket closed");

    //     return () => ws.close();
    // }, [project_id]);


    
