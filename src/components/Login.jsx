import React, { useState } from "react";
import GoogleIcon from "./GoogleIcon";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
            if (
                storedUser.username === username &&
                storedUser.password === password
            ) {
                alert("Login success!");
                localStorage.setItem("username", username);
                navigate("/home");
            } else {
                alert("Incorrect username or password");
            }
        } else {
            alert("User not found");
            navigate("/register");
        }
    };

    return (
        <div className="flex items-center justify-center flex-col h-screen">
            <h1 className="text-5xl font-bold">MATH QUIZ</h1>
            <h3 className="text-xl font-normal mt-2">
                Trivia Quiz Built By Using Opentdb API.
            </h3>
            <div className="bg-primary p-5 rounded-md mt-4 w-[500px]">
                <form onSubmit={handleLogin} className="flex flex-col">
                    <p className="text-xs">Username</p>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-sm bg-transparent border border-accent rounded-md p-2"
                        required
                    />
                    <p className="text-xs mt-2">Password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-sm bg-transparent border border-accent rounded-md p-2"
                        required
                    />
                    <button className="bg-secondary rounded-md mt-3 text-sm p-1">
                        Login
                    </button>
                    <button
                        type="button" // This should not be a submit button
                        className="hidden bg-transparent rounded-md mt-2 text-sm p-1 border border-accent flex items-center justify-center gap-2"
                    >
                        <GoogleIcon />
                        Login With Google
                    </button>
                    <p className="text-xs text-center mt-2">
                        Don't have an account?&nbsp;
                        <Link to="/register">
                            <span className="underline cursor-pointer">Register</span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
