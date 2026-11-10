import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(() => {
        const storageAuth = localStorage.getItem("auth");
        if (storageAuth) {
            const { user, ...storedAuth } = JSON.parse(storageAuth);
            return {
                ...storedAuth,
                token: storedAuth.token ?? user ?? null
            };
        }

        return {
            logged: false,
            token: null,
            document: null,
            role: null
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