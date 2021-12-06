import { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        async function getUser(){
            const token =localStorage.getItem('token');
            if(token && (!name || !id)) {
                const response = await fetch('http://localhost:3001/api/user', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                const json = await response.json();
                console.log(json)
                setId(json.user.id);
                setName(json.user.name);
            }
        }

        getUser();
    // eslint-disable-next-line
    }, []);

    function setUser(userData) {
        setName(userData.name)
        setId(userData.id);
    }
    return (
        <UserContext.Provider value={{ name, id, setUser, 
            showSignIn, showSignUp, 
            setShowSignIn, setShowSignUp 
        }}>
            { props.children }
        </UserContext.Provider>
    )
}