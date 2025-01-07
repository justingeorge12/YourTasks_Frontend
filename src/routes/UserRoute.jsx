import { Route, Routes } from "react-router-dom";
import Home from "../components/userside/pages/Home";
import Register from "../components/userside/auth/Register";
import Login from "../components/userside/auth/Login";
import LogProtected from "./Protected/LogProtected";
import ProtectedRoute from "./Protected/ProtectedRoute";
import Projects from "../components/userside/pages/Projects";
import NotFound from "../components/userside/Layout/NotFound";
import Tasks from "../components/userside/pages/Tasks";
import TaskAnalysis from "../components/userside/pages/TaskAnalysis";


function UserRoute() {
    return(
        <Routes>
            <Route path="/register" element={<LogProtected children={ <Register /> } redirectTo={'/'} /> } />
            <Route path="login" element={<LogProtected children={ <Login /> } redirectTo={'/'} />  } />
            <Route path="*" element={<NotFound /> } />
            <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute> } />
            <Route path="/projects" element={<ProtectedRoute> <Projects /> </ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><Tasks /> </ProtectedRoute>} />
            <Route path="/taskanalysis" element={<ProtectedRoute><TaskAnalysis /> </ProtectedRoute>} />
        </Routes>
    )
}

export default UserRoute