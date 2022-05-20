import { Icon } from "@iconify/react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { useTheme } from "../../context/Theme/themeContext";
import { loginUser } from "../../services";
import loginImg from "./../../assets/Login.svg"
import { useDocumentTitle } from "../../utils/useDocumentTitle";



export const Login = () => {
    const { theme, changeTheme } = useTheme();
    const navigate = useNavigate();
    const { userState: { email, password }, userDispatch, setLogin, errorMsg, setErrorMsg } = useAuth();

    const logUser = (e) => {
        e.preventDefault();
        loginUser(email, password, setLogin, userDispatch, navigate, setErrorMsg)
    }
    useDocumentTitle("HABIT TRACKER | LOGIN");
    const autoLogin = (userDispatch) => {
        userDispatch({
            type: "EMAIL-SETTER",
            payload: "testuser@gmail.com"
        });
        userDispatch({
            type: "PASSWORD-SETTER",
            payload: "TestUser@123"
        });
        (email && password) && loginUser(email, password, setLogin, userDispatch, navigate, setErrorMsg)
    }
    return (
        <div className="landing-page-wrapper login-pos pos-relative">
            <div className="theme-icon head-1 cursor-pointer" onClick={() => changeTheme()}>
                {
                    theme === "light" ? <Icon icon="ic:round-dark-mode" /> : <Icon icon="ic:outline-dark-mode" />
                }
            </div>
            <div className="d-flex">
                <section className="content-main">
                    <header className="head-0">
                        A Daily <span className="highlight-main">Habit Tracker</span> App
                    </header>
                    {
                        errorMsg && (
                            <div className="error-msg mar-y-1">
                                {errorMsg}
                            </div>
                        )
                    }
                    <form onSubmit={logUser}>
                        <main className="mar-y-3  d-flex flex-col items-center">
                            <div className="head-1"><span className="highlight-main">Login</span></div>

                            <input
                                type="email"
                                placeholder="Please Enter EmailId "
                                className="form-control pad-xs mar-y-3 w-50"
                                value={email}
                                onChange={(e) => userDispatch({
                                    type: "EMAIL-SETTER",
                                    payload: e.target.value
                                })}
                            />
                            <input
                                type="password"
                                placeholder="Please Enter Password"
                                className="form-control pad-xs mar-y-3 w-50"
                                value={password}
                                onChange={(e) => userDispatch({
                                    type: "PASSWORD-SETTER",
                                    payload: e.target.value
                                })}
                            />
                            <button type="submit" className="btn-login head-3 pad-xs cursor-pointer  mar-y-3">
                                Login
                            </button>
                            <button onClick={() => autoLogin(userDispatch)} className="btn-login head-3 pad-xs cursor-pointer  mar-y-3">
                                Default Credentials
                            </button>
                            <div className="head-3  bold-dark mar-y-2" >
                                <Link className="cursor-pointer" to="/signup">
                                    Not a User?
                                </Link>
                            </div>

                        </main>
                    </form>
                </section>
                <section className="landing-img-section">
                    <img className="main-page-banner-img" src={loginImg} alt="main-img" />
                </section>
            </div>
        </div>
    )
}