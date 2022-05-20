import { Icon } from "@iconify/react";
import { useState } from "react";
import { useHabbitData } from "../../../context/HabbitData/HabbitDataContext";
import { useTheme } from "../../../context/Theme/themeContext";
export const PomodoroTimerFeature = ({ setToggleTimer, habitId }) => {
    const { toggleContent } = useHabbitData();
    const {
        dispatch,
    } = useHabbitData();
    const [workTime, setWorkTime] = useState("30");
    const [breakTime, setBreakTime] = useState("5");
    const { theme, changeTheme } = useTheme();
    return (
        <section className={toggleContent ? "spanning-content" : "progress-content"}>
            <div className={toggleContent ? "spanned-progress-sub-content" : "progress-sub-content"}>
                <nav className="main-content-nav d-flex items-center pad-sm">
                    <header className="d-flex items-center">

                        <div className="head-2">Timer Settings</div>
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
                <div className="progress-details w-100 d-flex flex-col items-center mar-y-5">
                    <div className=" pad-sm d-flex flex-col w-50 items-center custom-card">
                        <div className="d-flex flex-col">
                            <label className="mar-y-2">{`Work Time : ${workTime} `}</label>
                            <input
                                name="workTime"
                                type="range"
                                min="1"
                                max="60"
                                value={workTime}
                                onChange={(e) => setWorkTime(e.target.value)}
                            />
                        </div>
                        <div className="d-flex flex-col mb-4">
                            <label className="mar-y-2">{`Break Time : ${breakTime} `}</label>
                            <input
                                name="breakTime"
                                type="range"
                                min="0"
                                max="30"
                                value={breakTime}
                                onChange={(e) => setBreakTime(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-secondory cursor-pointer mar-y-2"
                            onClick={() => {
                                dispatch({
                                    type: "TOGGLE-TIME",
                                    payload: { workMinutes: workTime, breakMinutes: breakTime, habitId: habitId },
                                });
                                setToggleTimer((settingsModal) => !settingsModal);
                            }}
                        >
                            Edit Time
                        </button>
                    </div>
                </div>
            </div>
        </section>)

}