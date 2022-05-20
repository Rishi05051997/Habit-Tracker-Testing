import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/Theme/themeContext";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import activity from "./../../assets/activity.svg";

export const MainPage = () => {
    const { theme, changeTheme } = useTheme();


    useDocumentTitle("HABIT TRACKER | MAIN PAGE");
    return (

        <div className="landing-page-wrapper pos-relative">
            <div className="theme-icon head-1 cursor-pointer" onClick={() => changeTheme()}>
                {
                    theme === "light" ? <Icon icon="ic:round-dark-mode" /> : <Icon icon="ic:outline-dark-mode" />
                }
            </div>
            <div className="d-flex">
                <section className="content-main">
                    <header className="head-1 mar-y-5">
                        A Daily <span className="highlight-main">Habit Tracker</span> App
                    </header>
                    <main className="landing-page-content d-flex flex-col items-center">
                        <div className="head-2 bold-dark d-flex justify-center mar-y-5">Introducing A Daily <span className="highlight-main">Habit Tracker</span> App</div>
                        <div className="head-2 bold-dark mar-y-5">A Habit Tracker App</div>
                        <ul className="text-4 bold-dark mar-y-5">
                            <li className="d-flex items-center">
                                <Icon className="mar-x-2" icon="typcn:tick-outline" /> Effectively Handle Habits
                            </li>
                            <li className="d-flex items-center">
                                <Icon className="mar-x-2" icon="typcn:tick-outline" /> User Friendly
                            </li>
                        </ul>
                    </main>
                    <footer className="landing-page-footer head-2">
                        <button className="btn-join-now pad-md  mar-y-5">
                            <Link className="cursor-pointer" to="/login">
                                Join Now
                            </Link>
                        </button>
                        <div className="footer-content mar-y-3  d-flex flex-col items-center">
                            <div className="bold-dark" >
                                <Link className="cursor-pointer" to="/signup">
                                    Already have an Account?
                                </Link>
                            </div>
                        </div>
                    </footer>
                </section>
                <section className="landing-img-section">
                    <img className="main-page-banner-img" src={activity} alt="main-img" />
                </section>
            </div>
        </div>

    )
} 