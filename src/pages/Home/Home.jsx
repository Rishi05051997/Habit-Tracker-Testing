import { Layout } from "./../../components/Layout/Layout"
import { Icon } from "@iconify/react";
import { useHabbitData } from "../../context/HabbitData/HabbitDataContext";
import { HabitsListing } from "../../pages/HabitsListing/HabitsListing";

import { useTheme } from "../../context/Theme/themeContext";
import { HabitProgress } from "../../pages/Home/HabitProgress/HabitProgress";
import { NoHabit } from "./NoHabit/NoHabit";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import { seachBasedOnInput } from "../../utils/habitsFilter";
import { useState } from "react";



export const Home = () => {
    const { toggleContent, setModelOpen, state: { habits }, showDescription } = useHabbitData();
    const { theme, changeTheme } = useTheme();
    const [searchText, setSearchText] = useState("")

    useDocumentTitle("HABIT TRACKER | HOME");

    const filteredHabits = seachBasedOnInput(habits, searchText);


    return (
        <>
            <div className="home-wrapper">
                <Layout />
                <section className={toggleContent ? "visibility-none" : "main-content"}>
                    <nav className="main-content-nav d-flex items-center pad-sm">
                        <header>
                            <div className="head-2">All Habits</div>
                        </header>
                        <ul className="main-content-list d-flex justify-between items-center">
                            <li>
                                <input
                                    type="text"
                                    placeholder="Type Name to Search!!!"
                                    className="form-control pad-xs w-75"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
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
                        filteredHabits.length > 0 ? (
                            <HabitsListing habits={filteredHabits} />
                        ) : (
                            < NoHabit />
                        )
                    }
                </section>
                {
                    (showDescription && habits.length > 0) && (

                        < HabitProgress />
                    )
                }
            </div>

        </>
    )
}