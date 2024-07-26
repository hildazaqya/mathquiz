import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    };
    return (
        <div className="flex items-center justify-center flex-col h-screen text-accent">
            <h1 className="text-5xl font-bold">
                MATH QUIZ
            </h1>
            <h3 className="text-xl font-normal mt-2">
                Trivia Quiz Built By Using Opentdb API.
            </h3>
            <div className="bg-primary p-5 rounded-md text-base mt-4 w-[500px]">
                <h3 className="text-base font-semibold text-center">Register</h3>
                <form onSubmit={handleRegister} className="flex flex-col">
                    <p className="text-xs">Username</p>
                    <input type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-sm bg-transparent border border-accent rounded-md p-1" />

                    <p className="text-xs mt-2">Email</p>
                    <input type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-sm bg-transparent border border-accent rounded-md p-1" />

                    <p className="text-xs mt-2">Create Password</p>
                    <input type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-sm bg-transparent border border-accent rounded-md p-1" />
                    <button type="submit" className="bg-secondary rounded-md mt-3 text-sm p-1">
                        Register
                    </button>
                    <p className="text-xs text-center mt-2">Have account?
                        <Link to="/login">
                            <span className="underline cursor-pointer">Login</span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register;