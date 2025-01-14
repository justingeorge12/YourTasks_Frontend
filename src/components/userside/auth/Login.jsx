import { useNavigate } from "react-router-dom"
import api from '../../../services/api'
import { useDispatch } from 'react-redux'
import {loginSuccess} from '../../../redux/authSlice'
import { useState } from "react"
import toast from "react-hot-toast"

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username || !password) {
            toast.error("Username and password are required.");
            return;
        }

        try{
            const res = await api.post('/token/', {username, password})

            const {access, refresh, role, user_id} = res.data
            console.log(res.data)
            dispatch(loginSuccess({access_token:access, refresh_token:refresh, user_id, role}))
            navigate('/')
        }
        catch (err) {
            console.log(err)
            if (err.status === 401) {
                if (err.response.data?.detail === "No active account found with the given credentials"){
                    toast.error('No account with the credentials')
                }
                else{

                    toast.error('your credentails are not correct')
                }
            }
            else{
                toast.error('there is some error please try again')
            }
        }
    }

    return(
        <div>
            <div className="h-screen flex justify-center">
                <div className="my-16 border w-[500px] bg-gradient-to-br from-white to-fuchsia-200 rounded-lg">
                    <div className="mt-10 justify-center flex">
                        <h1 className="text-2xl font-bold">Login </h1>
                    </div>
                    <div className="m-14 justify-center flex ">
                        <form onSubmit={handleSubmit} className="w-full"> 
                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border mt-4 w-full py-2 rounded-md pl-3 focus:outline-none  focus:border-fuchsia-500" placeholder="username" />
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border mt-4 w-full py-2 pl-3 rounded-md focus:outline-none  focus:border-fuchsia-500" placeholder="password"/>
                            <button className="border w-full mt-8 py-2 font-semibold bg-gradient-to-r from-fuchsia-400 via-fuchsia-200 to-fuchsia-400 rounded-md">Login</button>
                        </form>
                    </div>
                    <div className="flex justify-center">
                        <p className="font-mono">I don't have account, <span onClick={() => navigate('/register')} className="hover:text-fuchsia-500 cursor-pointer">Register</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login