import React, { useState } from "react";
import GoogleIcon from "./GoogleIcon";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
    e.preventDefault();
 
    const userData = {
        username,
        email,
        password,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    alert("Registration success!")
    navigate("/login")
}
    }
class Login extends React.Component {
    render() {
        return (
            <div className="flex items-center justify-center flex-col h-screen">
                <h1 className="text-5xl font-bold">
                    MATH QUIZ
                </h1>
                <h3 className="text-xl font-normal mt-2">
                    Trivia Quiz Built By Using Opentdb API.
                </h3>
                <div className="bg-primary p-5 rounded-md mt-4 w-[500px]">
                    <form action="" className="flex flex-col">
                        <p className="text-xs">Username</p>
                        <input type="text" placeholder="Username" className="text-sm bg-transparent border border-accent rounded-md p-2" />
                        <p className="text-xs mt-2">Password</p>
                        <input type="password" placeholder="Password" className="text-sm bg-transparent border border-accent rounded-md p-2" />
                        <button className="bg-secondary rounded-md mt-3 text-sm p-1">
                            Login
                        </button>
                        <button className="bg-transparent rounded-md mt-2 text-sm p-1 border border-accent flex items-center justify-center gap-2">
                            <GoogleIcon />
                            Login With Google
                        </button>
                        <p className="text-xs text-center mt-2">Dont have account?&nbsp;
                            <Link to="/register">
                                <span className="underline cursor-pointer">Register</span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;