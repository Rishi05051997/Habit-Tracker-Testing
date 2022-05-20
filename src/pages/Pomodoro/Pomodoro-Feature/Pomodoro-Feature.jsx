import { Icon } from "@iconify/react";
import { useHabbitData } from "../../../context/HabbitData/HabbitDataContext";
import { useTheme } from "../../../context/Theme/themeContext";
import { NoHabit } from "../../Home/NoHabit/NoHabit";
import { PomodoroMainContent } from "./PomodoroMainContent";
export const PomodoroFeature = ({ setToggleTimer, pomodoroHabit, habitId }) => {
    const { toggleContent } = useHabbitData();
    // const navigate = useNavigate();
    const { theme, changeTheme } = useTheme();
    return (
        <section className={toggleContent ? "visibility-none" : "main-content"}>
            <nav className="main-content-nav d-flex items-center pad-sm">
                <header>
                    <div className="head-2">POMODORO</div>
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
            {
                pomodoroHabit ? (
                    <PomodoroMainContent pomodoroHabit={pomodoroHabit} habitId={habitId} setToggleTimer={setToggleTimer} />
                ) : (
                    <NoHabit />
                )
            }
        </section>
    )
}