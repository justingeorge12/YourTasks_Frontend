import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

function LogProtected({children, redirectTo}) {
    const location = useLocation()

    const role = useSelector((state) => state.auth?.role)

    if (role && location.pathname !== redirectTo) {
        return <Navigate to = {redirectTo} replace />
    }
    return children
}
export default LogProtected