import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useHabbitData } from "../../context/HabbitData/HabbitDataContext";
import { HabitsListing } from "../../pages/HabitsListing/HabitsListing";
import { Sidebar } from "../Sidebar/Sidebar";
import habbit_1 from "./../../assets/habbit-1.svg";
import habbit_2 from "./../../assets/habbit-2.svg";
import habbit_3 from "./../../assets/habbit-3.svg";
import avatar from "./../../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from "../../context/Theme/themeContext";
import { HabitProgress } from "../../pages/Home/HabitProgress/HabitProgress";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
            text: 'MONTHLY AVERAGE',
        },
    },
};

const labels = ['DAY', 'WEEK', 'MONTH'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [1, 2, 3, 4, 5, 5, 6, 6, 6, 7, 8, 9, 47, 77],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [1, 2, 3, 4, 5, 5, 6, 6, 6, 7, 8, 9, 47, 77],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};
export const Layout = () => {
    const { toggleContent, setToggleContent, setModelOpen, state: { habits, archives }, showDescription, modelData } = useHabbitData();
    const navigate = useNavigate();
    const { theme, changeTheme } = useTheme();
    const [value, onChange] = useState(new Date());
    const copyUrlHandler = () => {
        navigator.clipboard.writeText(`http://localhost:3000/hdhdhdhdh`)
    }
    return (
        <div className="home-wrapper">
            < Sidebar />
            {/* <section className={toggleContent ? "visibility-none" : "main-content"}>
                <nav className="main-content-nav d-flex items-center pad-sm">
                    <header>
                        <div className="head-2">Morning</div>
                    </header>
                    <ul className="main-content-list d-flex justify-between items-center">
                        <li>
                            <input
                                type="text"
                                placeholder="Type here to Search!!!"
                                className="form-control pad-xs w-75"
                            />
                        </li>
                        <li>
                            <input
                                type="date"
                                className="form-control pad-xs w-75"
                            />
                        </li>
                        <li>
                            <button onClick={() => setModelOpen(val => !val)} className="btn btn-primary head-4 d-flex items-center cursor-pointer">
                                <Icon className="mar-x-2 text-3" icon="ant-design:plus-circle-outlined" />
                                Add New Habbits
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
                {
                    habits.length > 0 ? (
                        <HabitsListing habits={habits} />
                    ) : (
                        <main>
                            <div className="d-flex flex-col items-center">
                                <div className="d-flex flex-col justify-between">
                                    <img src={habbit_1} className="mar-y-5" alt="habbit tracker" />
                                    <img src={habbit_2} className="mar-y-2" alt="habbit tracker" />
                                    <img src={habbit_3} className="mar-y-2" alt="habbit tracker" />
                                </div>
                                <div className="head-3 mar-y-2">The Start of a Better You!</div>
                                <div className="text-2 mar-y-2">
                                    Habits are like dominos. As one is formed, all others will follow!
                                </div>
                                <button onClick={() => setModelOpen(val => !val)} className="btn btn-primary head-4 d-flex items-center cursor-pointer mar-y-2">
                                    <Icon className="mar-x-2 text-3" icon="ant-design:plus-circle-outlined" />
                                    Add New Habbits
                                </button>
                            </div>
                        </main>
                    )
                }
            </section>
            {
                showDescription && (

                    < HabitProgress />
                )
            } */}
        </div>
    )
}