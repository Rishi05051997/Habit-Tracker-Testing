import { Icon } from "@iconify/react"
import { Layout } from "../../components/Layout/Layout"
import { useHabbitData } from "../../context/HabbitData/HabbitDataContext"
import { useTheme } from "../../context/Theme/themeContext"
import { useDocumentTitle } from "./../../utils/useDocumentTitle"
import notFound from "./../../assets/404-not-found.svg"
export const NotFound = () => {
    const { toggleContent } = useHabbitData()
    const { theme, changeTheme } = useTheme();

    useDocumentTitle("HABIT TRACKER | NOT FOUND");

    return (
        <div className="home-wrapper">
            <Layout />
            <section className={toggleContent ? "visibility-none" : "main-content"}>
                <nav className="main-content-nav d-flex items-center pad-sm">
                    <header>
                        <div className="head-2">404 Not Found</div>
                    </header>
                    <ul className="main-content-list d-flex justify-between items-center">
                        <li>
                            <div className="head-2 cursor-pointer" onClick={() => changeTheme()}>
                                {
                                    theme === "light" ? <Icon icon="ic:round-dark-mode" /> : <Icon icon="ic:outline-dark-mode" />
                                }
                            </div>
                        </li>
                    </ul>

                </nav>
                <main className="not-found w-100 d-flex items-center justify-center ">
                    <img className="w-75 mar-y-5" src={notFound} alt="notFound" />
                </main>

            </section>

        </div>
    )
}