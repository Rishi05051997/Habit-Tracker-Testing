import axios from "axios";

const isPasswordValid = (password) => {
    if (
        password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/) ==
        null
    )
        return false;
    else return true;
};

export const loginUser = (email, password, setLogin, userDispatch, navigate, setErrorMsg,) => {
    if (!isPasswordValid(password)) {
        setErrorMsg("Password must contain at least 8 characters, at least 1 number and both lower and uppercase letters.")

    } else {
        try {
            (async () => {
                const { data: { foundUser, encodedToken } } = await axios.post(
                    `/api/auth/login`,
                    {
                        email, password
                    }
                )
                if (foundUser && encodedToken) {
                    localStorage.setItem("token", encodedToken)
                    setLogin(foundUser);
                    localStorage.setItem("login", JSON.stringify(foundUser));
                    userDispatch({ type: "EMPTY-USER-STATE" });
                    navigate("/home")
                }
            })()
        } catch (error) {
            setErrorMsg("Something Went Wrong!!!")
        }
    }

}

export const createUser = (firstName, lastName, email, password, userDispatch, setLogin, setErrorMsg, navigate) => {
    if (firstName === "" || lastName === "") {
        setErrorMsg("FirstName or LastName can not be empty!!!");
    } else if (!isPasswordValid(password)) {
        setErrorMsg("Password must contain at least 8 characters, at least 1 number and both lower and uppercase letters.")
    } else {
        try {
            (async () => {
                const { data } = await axios.post(
                    '/api/auth/signup',
                    { email, password, firstName, lastName }
                )

                const { createdUser, encodedToken } = data;
                if (data) {
                    setLogin(createdUser);
                    localStorage.setItem("login", JSON.stringify(createdUser));
                    localStorage.setItem("token", encodedToken)
                    userDispatch({ type: "EMPTY-USER-STATE" });
                    navigate("/home")
                }
            })()
        } catch (error) {
            setErrorMsg("Something Went Wrong!!!")
        } finally {
            // setLoader(false);
        }
    }
}

export const logOutUser = (setLogin, navigate) => {
    setLogin(false);
    localStorage.clear();
    navigate("/");
};