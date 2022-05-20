import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHabbitData } from "../../context/HabbitData/HabbitDataContext";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import { Layout } from "./../../components/Layout/Layout"
import { PomodoroFeature } from "./Pomodoro-Feature/Pomodoro-Feature";
import { PomodoroTimerFeature } from "./Pomodoro-Timer-Feature/Pomodoro-Timer-Feature";

export const Pomodoro = () => {
    const [toggleTimer, setToggleTimer] = useState(false);
    const { habitId } = useParams();
    const { state: { habits } } = useHabbitData()

    const pomodoroHabit = habits.find(({ _id }) => _id === habitId);

    useDocumentTitle("HABIT TRACKER | POMODORO");


    return (
        <>
            <div className="home-wrapper">
                <Layout />
                <PomodoroFeature setToggleTimer={setToggleTimer} pomodoroHabit={pomodoroHabit} habitId={habitId} />
                {
                    toggleTimer && <PomodoroTimerFeature setToggleTimer={setToggleTimer} habitId={habitId} />
                }

            </div>
        </>
    );
}