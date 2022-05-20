import { useState, useRef, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Icon } from "@iconify/react";
import { useHabbitData } from "../../../context/HabbitData/HabbitDataContext";


export const PomodoroMainContent = ({ pomodoroHabit, habitId, setToggleTimer }) => {
    const { dispatch, setShowDescription } = useHabbitData();
    const { name, description, times, workMinutes, breakMinutes, totalAttemptsCounter, totalTimeAllocatedToCompleteHabit, timeTakenToCompleteHabitInMins } = pomodoroHabit;
    const [isPaused, setIsPaused] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(Number(workMinutes) * 60);
    const [mode, setMode] = useState("work");
    const secondsRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);
    useEffect(() => {
        secondsRef.current =
            mode === "work" ? Number(workMinutes) * 60 : Number(breakMinutes) * 60;
        setSecondsLeft(secondsRef.current);
        const timerId = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsRef.current === 0) {
                const nextMode = modeRef.current === "work" ? "break" : "work";
                const nextSeconds =
                    (nextMode === "work" ? Number(workMinutes) : Number(breakMinutes)) *
                    60;
                setMode(nextMode);

                modeRef.current = nextMode;
                setSecondsLeft(nextSeconds);
                secondsRef.current = nextSeconds;
            }

            secondsRef.current--;
            setSecondsLeft(secondsRef.current);
        }, 1000);

        return () => clearInterval(timerId);
    }, [workMinutes, breakMinutes, mode]);

    const totalSeconds =
        mode === "work" ? Number(workMinutes) * 60 : Number(breakMinutes) * 60;
    const percentage = Math.round((secondsLeft / totalSeconds) * 100);
    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) {
        seconds = ` 0${seconds}`;
    }

    // console.log(updatedCount)
    useEffect(() => {
        if (!(Number(times) >= Number(totalAttemptsCounter))) {
            setErrorMsg(`Your Attempts for this habit exhausted!!!, we are removing this habit`)
            // setTimeout(() => {
            //     removeHabitbyHabitId(dispatch, localStorage.getItem("token"), pomodoroHabit);
            //     setShowDescription(val => !val)

            // }, 5000)
        }
    }, [habitId, times, dispatch, totalAttemptsCounter, pomodoroHabit, setShowDescription]);


    return (
        <>
            <div className="d-flex flex-col  w-100 flex-wrap  justify-center items-center">
                <div className="d-flex w-100 flex-col justify-center items-center">
                    <div className="w-50" >
                        <CircularProgressbar
                            value={percentage}
                            text={minutes + " : " + seconds}
                            styles={buildStyles({
                                pathColor: mode === "work" ? "red" : "green",
                                tailColor: "rgba(255,255,255,.2)",
                            })}
                        />
                    </div>
                    <div className="d-flex justify-between items-center w-50 text-4 mar-y-3">
                        <div className="head-2 cursor-pointer d-flex justify-center items-center" >
                            <Icon icon="charm:refresh" onClick={() => {
                                secondsRef.current =
                                    mode === "work"
                                        ? Number(workMinutes) * 60
                                        : Number(breakMinutes) * 60;
                                setSecondsLeft(secondsRef.current);
                            }} />
                        </div>
                        <span>
                            {isPaused ? (

                                <div className="head-2 cursor-pointer d-flex justify-center items-center" >
                                    <Icon icon="ant-design:play-circle-filled"
                                        onClick={() => {
                                            setIsPaused(false);
                                            isPausedRef.current = false;
                                            dispatch({ type: "POMODORO-TOTAL-TIME", payload: { habitId: habitId, time: minutes } })
                                        }} />
                                </div>
                            ) : (
                                <div className="head-2 cursor-pointer d-flex justify-center items-center" >
                                    <Icon icon="ant-design:pause-circle-filled"
                                        onClick={() => {
                                            setIsPaused(true);
                                            isPausedRef.current = true;

                                        }} />
                                </div>
                            )}
                        </span>
                        <div className="head-2 cursor-pointer d-flex justify-center items-center" >
                            <Icon icon="ant-design:caret-right-outlined"
                                onClick={() =>
                                    setMode((mode) => (mode === "work" ? "break" : "work"))
                                } />
                        </div>
                        <Icon className="cursor-pointer" icon="ant-design:setting-filled" onClick={() => setToggleTimer((toggleTimer) => !toggleTimer)} />
                    </div>

                    <div className="d-flex justify-between items-center w-50 text-4 mar-y-3">
                        <button className="btn btn-secondory d-flex items-center cursor-pointer" onClick={() => {
                            dispatch({ type: "POMODORO-SUCCESS-COUNTER", payload: { habitId: habitId, counter: 1 } })
                            dispatch({ type: "POMODORO-TIME-LOGGER", payload: { habitId: habitId, time: minutes } })
                        }}>Success</button>
                        <button className="btn btn-secondory d-flex items-center cursor-pointer" onClick={() => {
                            dispatch({ type: "POMODORO-FAILURE-COUNTER", payload: { habitId: habitId, counter: 1 } })
                            dispatch({ type: "POMODORO-TIME-LOGGER", payload: { habitId: habitId, time: minutes } })
                        }}>Failure</button>
                        <button className="btn btn-secondory d-flex items-center cursor-pointer" onClick={() => {
                            dispatch({ type: "POMODORO-SKIPPED-COUNTER", payload: { habitId: habitId, counter: 1 } })
                            dispatch({ type: "POMODORO-TIME-LOGGER", payload: { habitId: habitId, time: minutes } })
                        }}>Skipped Now</button>
                    </div>
                </div>
                {habitId && (
                    <div className="mar-y-3 d-flex flex-col w-50 items-center custom-card">
                        {
                            errorMsg && <div className="error-msg head-4 text-center">{errorMsg}</div>
                        }
                        <div className="highlight-main head-2">{name}</div>
                        <div className="text-2 mar-y-3">
                            {description}
                        </div>
                        <div className="text-2 mar-y-3">
                            You can take this challenge upto - <span className="highlight-main head-4">{times}</span>
                        </div>
                        <div className="text-2 mar-y-3">
                            Total Times Taken - <span className="highlight-main head-4">{totalAttemptsCounter}</span>
                        </div>
                        <div >
                            {timeTakenToCompleteHabitInMins.length > 0 && (
                                timeTakenToCompleteHabitInMins.map((item) => (<div className="text-3">{item}</div>))
                            )}</div>
                    </div>
                )}
            </div>
        </>
    )
}