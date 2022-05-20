import { useHabbitData } from "../../../context/HabbitData/HabbitDataContext";
import { useState } from "react";
import avatar from "./../../../assets/avatar.png";
import { Icon } from "@iconify/react";
import 'react-calendar/dist/Calendar.css';
import { NotesContainer } from "./../Note/NotesContainer"
import Calendar from 'react-calendar';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from "../../../context/Theme/themeContext";
import { useRandomQuotes } from "../../../utils/useRandomQuotes";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: 'MINUTE AVERAGE',
        },
    },
};

const labels = [];

export const data = {
    labels,
    datasets: [
        {
            label: 'Time Taken',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Time To Complete',
            data: [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const HabitProgress = () => {
    const { toggleContent, setToggleContent, setModelOpen, selectedHabit, state: { habits }, setModelData, setIsEditable } = useHabbitData();
    const { theme, changeTheme } = useTheme();
    const [value, onChange] = useState(new Date());
    const [text] = useRandomQuotes()
    console.log(habits, "ALL HABITS")
    console.log(selectedHabit, "SELECTED HABIT")
    const habit = habits.find(({ _id }) => _id === selectedHabit._id)
    const { name, _id, selectedLabels, successCounter, failureCounter, skippedCounter, totalAttemptsCounter, totalTimeAllocatedToCompleteHabit, timeTakenToCompleteHabitInMins } = habit
    const copyUrlHandler = (_id) => {
        navigator.clipboard.writeText(`http://localhost:3000/${_id}`)
    }

    const updateHabitHandler = (habit) => {
        setModelData(habit);
        setModelOpen(val => !val);
        setIsEditable(val => !val);
    }

    if (totalTimeAllocatedToCompleteHabit) {
        totalTimeAllocatedToCompleteHabit.map((item, i) => labels.push(i + 1))
        totalTimeAllocatedToCompleteHabit.map((item) => data.datasets[0].data.push(item))
    }
    if (timeTakenToCompleteHabitInMins) {
        timeTakenToCompleteHabitInMins.map((item) => data.datasets[1].data.push(item))
    }

    console.log(data.datasets[0].data, data.datasets[1].data)
    return (
        <section className={toggleContent ? "spanning-content" : "progress-content"}>
            <div className={toggleContent ? "spanned-progress-sub-content" : "progress-sub-content"}>
                <nav className="main-content-nav d-flex items-center pad-sm">
                    <header className="d-flex items-center">
                        <button onClick={() => setToggleContent(val => !val)} className="btn btn-secondory d-flex items-center cursor-pointer">
                            {toggleContent ? <Icon className="text-3" icon="bi:arrow-right-circle" /> : <Icon className="text-3" icon="ant-design:expand-alt-outlined" />}
                        </button>

                        <div className="head-2">{name}</div>
                    </header>
                    <ul className="main-content-list d-flex justify-between items-center">
                        <li>
                            <button onClick={() => updateHabitHandler(habit)} className="btn btn-secondory d-flex items-center cursor-pointer">
                                <Icon className="text-3" icon="ci:edit" />
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setToggleContent(val => !val)} className="btn btn-secondory d-flex items-center cursor-pointer">
                                <Icon className="text-3" icon="fluent:panel-right-expand-20-filled" />
                            </button>
                        </li>
                        <li>
                            <div className="head-2 cursor-pointer" onClick={() => changeTheme()}>
                                {
                                    theme === "light" ? <Icon icon="ic:round-dark-mode" /> : <Icon icon="ic:outline-dark-mode" />
                                }
                            </div>
                        </li>
                    </ul>
                </nav>
                <main className="progress-details pad-sm">
                    <section className="section-border">
                        <div className="d-flex flex-col items-center">
                            <div className="mar-md">
                                <img className="xl-height xl-bdr-radius" src={avatar} height="50" alt="Profile" />
                            </div>
                            <div className="head-3">Share your Progress</div>
                            <div className="text-2 w-50 text-align-center mar-y-2 secondory-text-color">
                                {text}
                            </div>
                        </div>
                        <div className="pad-md share-url-section mar-y-2">
                            <div className="text-2 secondory-text-color">SHARE URL</div>
                            <div className="d-flex justify-between">
                                <div className="highlight-main head-3 mar-y-1">http://localhost:3000/{_id}</div>
                                <Icon onClick={() => copyUrlHandler(_id)} className="highlight-main head-2 cursor-pointer" icon="ic:baseline-copy-all" />
                            </div>
                        </div>
                    </section>
                    <section className="section-border d-flex items-center pad-md mar-y-2">
                        <Icon className="highlight-main head-2 cursor-pointer mar-x-2" icon="fluent:window-location-target-20-filled" />
                        <div className="d-flex flex-col">
                            <div className="text-2 secondory-text-color">CURRENT STREAK</div>
                            <div className="head-3 mar-y-1">0 days</div>
                        </div>
                    </section>
                    <section className="estimation mar-y-2">
                        <div className="d-flex">
                            <div className="section-border d-flex flex-col  pad-md w-50 mar-x-3">
                                <div className="d-flex">
                                    <Icon className="secondory-text-color text-2 mar-x-2" icon="charm:tick" />
                                    <div className="secondory-text-color text-2">COMPLETE</div>
                                </div>
                                <div className="head-3 mar-y-1">{successCounter}</div>
                                <div className="head-3 mar-y-1">------</div>

                            </div>
                            <div className="section-border d-flex flex-col  pad-md w-50">
                                <div className="d-flex">
                                    <Icon className="secondory-text-color text-2 mar-x-2" icon="charm:cross" />
                                    <div className="secondory-text-color text-2">FAILED</div>
                                </div>
                                <div className="head-3 mar-y-1">{failureCounter}</div>
                                <div className="head-3 mar-y-1">------</div>
                            </div>

                        </div>
                        <div className="d-flex mar-y-3">
                            <div className="section-border d-flex flex-col  pad-md w-50 mar-x-3">
                                <div className="d-flex">
                                    <Icon className="secondory-text-color text-2 mar-x-2" icon="carbon:arrow-right" />
                                    <div className="secondory-text-color text-2">SKIPPED</div>
                                </div>
                                <div className="head-3 mar-y-1">{skippedCounter}</div>
                                <div className="head-3 mar-y-1">------</div>
                            </div>
                            <div className="section-border d-flex flex-col  pad-md w-50">
                                <div className="d-flex">
                                    <div className="secondory-text-color text-2">TOTAL</div>
                                </div>
                                <div className="head-3 mar-y-1">{totalAttemptsCounter}</div>
                                <div className="head-3 mar-y-1">------</div>
                            </div>

                        </div>
                        <div className="mar-y-3">
                            {
                                selectedLabels.length > 0 &&
                                (<>
                                    <div className="head-4">Selected Labels</div>
                                    <div className="section-border label-section mar-y-2 d-flex pad-md">
                                        {
                                            selectedLabels.map((label, i) =>
                                                <button key={i} className="chips-btn cursor-pointer"  >
                                                    <p>{label}</p>
                                                </button>
                                            )
                                        }
                                    </div>
                                </>)
                            }
                        </div>
                    </section>
                    <section className="display-calendor   mar-y-2">
                        <Calendar className="section-border w-100" onChange={onChange} value={value} />
                    </section>
                    <section className="section-border pad-md graph mar-y-2">
                        <Line datasetIdKey='id' data={data} />
                    </section>
                </main>
            </div>
            <div className={toggleContent ? "notes-content " : "visibility-none"}>
                < NotesContainer habit={habit} />
            </div>
        </section>
    )
}