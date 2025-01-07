import { useNavigate } from "react-router-dom"
import api from "../../../services/api"
import { useDispatch } from "react-redux"
import { logout } from "../../../redux/authSlice"

function Nav() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try{
          const token = localStorage.getItem('refresh')
          const res = await api.post('logout', {token})
          localStorage.clear()
          dispatch(logout)
          delete api.defaults.headers.common["Authorization"];
          navigate('/login')
    
        }
        catch (err) {
          console.log(err)
          localStorage.clear()
          dispatch(logout)
          delete api.defaults.headers.common["Authorization"];
          navigate('/login')
        }
      }


    return(
        <div className="bg-fuchsia-50">
            <div className="h-16 flex justify-between mx-10 items-center">
                <div >
                    <h1 className="text-3xl font-semibold text-slate-800">
                        <span className="font-bold text-3xl text-black">Y</span>our<span className="font-bold text-3xl text-black">T</span>a<span className="font-bold text-3xl text-black">S</span>k
                    </h1>
                </div>
                <div className="flex gap-3">
                    <h1 onClick={()=> navigate('/projects')} className="font-semibold text-lg cursor-pointer">Activities</h1>
                    <h1 onClick={handleLogout} className="font-semibold text-lg cursor-pointer hover:text-red-400">Logout</h1>
                </div>
            </div>
        </div>
    )
}

export default Nav