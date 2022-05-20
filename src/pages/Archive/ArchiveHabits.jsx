import { Layout } from "./../../components/Layout/Layout"
import { Icon } from "@iconify/react";
import { useHabbitData } from "../../context/HabbitData/HabbitDataContext";
import { HabitsListing } from "../../pages/HabitsListing/HabitsListing";
import { useTheme } from "../../context/Theme/themeContext";
import { NoHabit } from "../Home/NoHabit/NoHabit";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import { useState } from "react";
import { seachBasedOnInput } from "../../utils/habitsFilter";


export const ArchiveHabits = () => {
    const { toggleContent, state: { archives } } = useHabbitData();
    const { theme, changeTheme } = useTheme();
    const [searchText, setSearchText] = useState("");

    useDocumentTitle("HABIT TRACKER | ARCHIVE");

    const filteredArchiveHabits = seachBasedOnInput(archives, searchText)


    return (
        <>
            <div className="home-wrapper">
                <Layout />
                <section className={toggleContent ? "visibility-none" : "main-content"}>
                    <nav className="main-content-nav d-flex items-center pad-sm">
                        <header>
                            <div className="head-2">ARCHIVE</div>
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
                                <div className="head-2 cursor-pointer" onClick={() => changeTheme()}>
                                    {
                                        theme === "light" ? <Icon icon="ic:round-dark-mode" /> : <Icon icon="ic:outline-dark-mode" />
                                    }
                                </div>
                            </li>
                        </ul>
                    </nav>
                    {
                        filteredArchiveHabits.length > 0 ? (
                            <HabitsListing habits={filteredArchiveHabits} isArchive={true} />
                        ) : (
                            <NoHabit />
                        )
                    }
                </section>
            </div>

        </>
    )
}