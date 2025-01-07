import { useEffect, useState } from "react"
import api from "../../../../services/api"
import toast from "react-hot-toast";

function AddProject({onClose, project , fetchProjects}) {

    const [name, setName] = useState('')
    const [error, setError] = useState("");


    useEffect(() => {
        if (project) {
          setName(project.name); 
        }
      }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name.trim()) {
            setError("Project name cannot be empty.");
            return;
        }

        try {
            if (project) {
              const res = await api.put(`/projects/${project.id}/`, { name });
              console.log(res, 'Project updated');
              toast.success('Project updated successfully');
            } else {
              const res = await api.post('/projects/', { name });
              console.log(res, 'Project created');
              toast.success('Project created successfully');
            }
            onClose();
            fetchProjects()
        }
        catch (err) {
            console.log(err)
            setError("Failed to add project. Please try again.");
        }
    }

    return(
        <div className='fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50 p-10'>
            <div className="relative bg-black m-10 mx-14 border border-slate-600 rounded-md p-6 scroll-auto w-[400px]">
                <h1 className="text-2xl font-bold text-center mb-6 text-slate-400">Add Project</h1>
                <div className="absolute top-4 right-4 bg-slate-800 rounded-md px-2 hover:text-red-600" >
                    <button onClick={() => onClose()} > ✕ </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label className="block text-sm font-medium text-gray-600">Product Name</label>
                        <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value); setError("");}}  className="block w-full px-4 py-2 mt-1 border border-slate-600 rounded-md  focus:outline-none focus:border-blue-900" />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button type="submit" className="px-6 py-2 font-bold bg-fuchsia-300 rounded-md w-full hover:bg-fuchsia-400">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default  AddProject