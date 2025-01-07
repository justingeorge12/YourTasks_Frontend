import { useEffect, useState } from "react"
import AddProject from "./Modal/AddProject"
import api from "../../../services/api"
import CommonModal from "./Modal/CommonModal"
import { useNavigate } from "react-router-dom"

function Projects() {

    const navigate = useNavigate()


    const [projects, setProjects] = useState([])
    const [addProject, setAddProject] = useState(false)
    const [projectToEdit, setProjectToEdit] = useState(null); 
    const [deleteProjectId, setDeleteProjectId] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)

    const fetchProjects = async () => {
        try{
            const res = await api.get('/projects/')
            console.log(res) 
            setProjects(res.data)
        } 
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])


    const handleEditProject = (project) => {
        setProjectToEdit(project); 
        setAddProject(true);
    };

    const handleDelete = (deleteproject) => {
        setDeleteProjectId(deleteproject)
        setDeleteModal(true)
    }

    const handleDeleteProject = async () => {
        try{
            const res = await api.delete(`/projects/${deleteProjectId}/`)
            setDeleteModal(false)
            fetchProjects()
        }catch (err) {
            console.log(err)
        }
    }



    return(
        <div>
            <div className="flex justify-center mt-10">
                <h1 className="text-2xl font-semibold">Projects</h1>
            </div>
            <div className="right-0 absolute mr-10">
                <button onClick={() => setAddProject(true)} className="border border-lime-400 rounded-md px-2 py-1"> Add Project </button>
            </div>
            
            <div className="mx-28 mt-10">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-sm uppercase border-b border-slate-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">Id</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Date created</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((data, index) => (
                            <tr key={data.id} className="border-b border-slate-700">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap"> {data.id}</th>
                            <td onClick={() => navigate('/tasks', {state:{project_id:data.id}})} className="px-6 py-4 cursor-pointer">{data.name}</td>
                            <td className="px-6 py-4">{data.created_at ? data.created_at.slice(0, 10) : 'N/A'}</td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleEditProject(data)} className="border px-2 py-1 mr-2">Edit</button>
                                <button onClick={()=> handleDelete(data.id)} className="border px-2 py-1 ml-2">Delete</button>
                            </td>   
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {addProject && <AddProject onClose={() => setAddProject(false)} project={projectToEdit} fetchProjects={fetchProjects} />}
            {deleteModal && <CommonModal onClose={() => setDeleteModal(false) } message={'delete the project'} func={handleDeleteProject} />}
        </div>
    )
}

export default Projects