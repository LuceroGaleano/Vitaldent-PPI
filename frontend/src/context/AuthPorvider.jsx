import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(() => {
        const storageAuth = localStorage.getItem("auth");
        return storageAuth ? JSON.parse(storageAuth) : {
            logged: false,
            user: null
        }
    })

    useEffect(() => {
            localStorage.setItem("auth", JSON.stringify(auth));
        }, [auth]);


    
    return(
        <AuthContext.Provider value ={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}