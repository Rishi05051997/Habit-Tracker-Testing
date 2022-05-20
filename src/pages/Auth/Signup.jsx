import { Icon } from "@iconify/react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { useTheme } from "../../context/Theme/themeContext";
import { createUser } from "../../services";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import login from "./../../assets/Login.svg";

export const Signup = () => {
    const { theme, changeTheme } = useTheme();
    const navigate = useNavigate();

    const { userState: { firstName, lastName, email, password }, userDispatch, setLogin, errorMsg, setErrorMsg } = useAuth();
    useDocumentTitle("HABIT TRACKER | SIGNUP");

    const signupFormHandler = (e) => {
        e.preventDefault();
        (firstName && lastName && email && password) && createUser(firstName, lastName, email, password, userDispatch, setLogin, setErrorMsg, navigate)
    }
    return (
        <div className="landing-page-wrapper pos-relative">
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
                    <form onSubmit={signupFormHandler}>
                        <main className="mar-y-3 d-flex flex-col items-center">
                            <div className="head-1"><span className="highlight-main">Sign Up</span></div>

                            <input
                                type="text"
                                placeholder="Please Enter First Name "
                                className="form-control pad-xs mar-y-2 w-50"
                                onChange={(e) => userDispatch({
                                    type: "FIRSTNAME-SETTER",
                                    payload: e.target.value
                                })}
                            />
                            <input
                                type="text"
                                placeholder="Please Enter Last Name "
                                className="form-control pad-xs mar-y-2 w-50"
                                onChange={(e) => userDispatch({
                                    type: "LASTNAME-SETTER",
                                    payload: e.target.value
                                })}
                            />
                            <input
                                type="email"
                                placeholder="Please Enter EmailId "
                                className="form-control pad-xs mar-y-2 w-50"
                                onChange={(e) => userDispatch({
                                    type: "EMAIL-SETTER",
                                    payload: e.target.value
                                })}
                            />
                            <input
                                type="password"
                                placeholder="Please Enter Password"
                                className="form-control pad-xs mar-y-2 w-50"
                                onChange={(e) => userDispatch({
                                    type: "PASSWORD-SETTER",
                                    payload: e.target.value
                                })}
                            />
                            <button className="btn-login pad-xs head-3 cursor-pointer  mar-y-2">
                                Signup
                            </button>
                            <div className="head-3  bold-dark mar-y-2" >
                                <Link className="cursor-pointer" to="/login">
                                    Already User?
                                </Link>
                            </div>

                        </main>
                    </form>
                </section>
                <section className="landing-img-section">
                    <img className="main-page-banner-img" src={login} alt="main-img" />
                </section>
            </div>
        </div>
    )
}