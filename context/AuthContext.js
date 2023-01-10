import { createContext } from "react";

const AuthContext = createContext({
    user: {},
    setUserData: () => { }
})

export default AuthContext;