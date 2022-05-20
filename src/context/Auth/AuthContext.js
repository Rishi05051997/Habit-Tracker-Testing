import { createContext, useContext, useReducer, useState } from "react";
import { authReducer } from "../../Reducers/Auth/authReducer";

const intialUserStateVal = {
    firstName: "",
    lastName: "",
    emailId: "",
    password: ""
}

const authContext = createContext(intialUserStateVal);

const AuthProvider = ({ children }) => {
    const [userState, userDispatch] = useReducer(authReducer, intialUserStateVal);
    const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")) || false);
    const [errorMsg, setErrorMsg] = useState("");
    return (
        <authContext.Provider value={{ userState, userDispatch, login, setLogin, errorMsg, setErrorMsg }}>
            {
                children
            }
        </authContext.Provider>)
}

const useAuth = () => useContext(authContext);

export { useAuth, AuthProvider, intialUserStateVal }