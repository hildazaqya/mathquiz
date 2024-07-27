import React, { useEffect, useState } from "react";

function Navbar() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <nav className="bg-accent p-3 flex flex-row items-center justify-between">
            <h2 className="text-neutral text-xl font-bold">Math Quiz</h2>
            <div className="rounded-md bg-primary px-2 py-1 flex justify-between items-center">
                <img src="./profile.svg" alt="Profile" width={35}/>
                <span className="text-sm ps-1">{username ? `Hello, ${username}!` : `Hello, Guest!`}</span>
            </div>
        </nav>
    );
}

export default Navbar;
