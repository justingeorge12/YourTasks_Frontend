import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import api from "../../services/api"
import {jwtDecode} from 'jwt-decode'



function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token')
        try{
            const res = await api.post('/token/refresh', {refresh:refreshToken})

            if (res.status === 200) {
                localStorage.setItem('access_token', res.data.access)
                localStorage.setItem('refresh_token', res.data.refresh)
                setIsAuthorized(true)
            } 
            else{
                setIsAuthorized(false)
            }

        }
        catch(error) {
            setIsAuthorized(false)
        }
       
    }

    const auth = async () => {
        const token = localStorage.getItem('access_token')
        const role = localStorage.getItem('role')


        if (!token) {
            setIsAuthorized(false)
            return
        }

        if (role !== 'user') {
            setIsAuthorized(false)
            return
        }

        const decoded = jwtDecode(token) 
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000


        if (tokenExpiration < now) {
            await refreshToken()
        } 
        else{
            setIsAuthorized(true)
        }
    }

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [auth])

    if (isAuthorized === null) {
        return <div> Loading..... </div>
    }

    return isAuthorized ? children : <Navigate to='/login/' />
}

export default ProtectedRoute 