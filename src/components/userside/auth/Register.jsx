import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from '../../../services/api'
import toast from "react-hot-toast";

function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === "confirmPassword" || e.target.name === "password") {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        try {
            const response = await api.post("register", {username: formData.username, email: formData.email, password: formData.password});
            console.log(response, 'reeeees')
            toast.success('registration successfull')
            navigate("/login");

        } catch (err) {
            console.log(err)
            setError(err.response?.data || "Something went wrong");
        }
    };

    return(
        <div>
            <div className="h-screen flex justify-center">
                <div className="my-10 border w-[500px] bg-gradient-to-br from-white to-fuchsia-200 rounded-lg">
                    <div className="mt-10 justify-center flex">
                        <h1 className="text-2xl font-bold">Register </h1>
                    </div>
                    <div className="mx-14 my-10 justify-center flex ">
                        <form onSubmit={handleSubmit} className="w-full">
                            <input type="text" name="username" value={formData.username} onChange={handleChange} className="border mt-4 w-full py-2 rounded-md pl-3 focus:outline-none  focus:border-fuchsia-500" placeholder="username" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="border mt-4 w-full py-2 rounded-md pl-3 focus:outline-none  focus:border-fuchsia-500" placeholder="email" />
                            <input type="password" name="password" value={formData.password} onChange={handleChange} className="border mt-4 w-full py-2 rounded-md pl-3 focus:outline-none  focus:border-fuchsia-500" placeholder="password" />
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="border mt-4 w-full py-2 rounded-md pl-3 focus:outline-none  focus:border-fuchsia-500" placeholder="confirm password" />    
                            {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                            <button type="submit" className="border w-full mt-8 py-2 font-semibold bg-gradient-to-r from-fuchsia-400 via-fuchsia-200 to-fuchsia-400 rounded-md">Register</button>
                        </form>
                    </div>
                    {error && <div className="text-red-500 text-center">
                        {Object.keys(error).map((key) => (
                            <div key={key}>{`${key}: ${error[key].join(", ")}`}</div>
                        ))}
                    </div>}
                    
                    <div className="flex justify-center">
                        <p className="font-mono">I have an account, <span onClick={() => navigate('/login')} className="hover:text-fuchsia-500 cursor-pointer">Login </span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Register