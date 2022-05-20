import habbit_1 from "./../../../assets/habbit-1.svg";
import habbit_2 from "./../../../assets/habbit-2.svg";
import habbit_3 from "./../../../assets/habbit-3.svg";
import { useHabbitData } from "../../../context/HabbitData/HabbitDataContext";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useRandomQuotes } from "../../../utils/useRandomQuotes";
export const NoHabit = () => {
    const { setModelOpen } = useHabbitData();
    const [text] = useRandomQuotes()
    return (
        <main>
            <div className="d-flex flex-col items-center">
                <div className="d-flex flex-col justify-between">
                    <img src={habbit_1} className="mar-y-5" alt="habbit tracker" />
                    <img src={habbit_2} className="mar-y-2" alt="habbit tracker" />
                    <img src={habbit_3} className="mar-y-2" alt="habbit tracker" />
                </div>
                <div className="head-3 mar-y-2">The Start of a Better You!</div>
                <div className="head-4 mar-y-2 highlight-main">
                    {/* Habits are like dominos. As one is formed, all others will follow! */}
                    {text}
                </div>
                <button onClick={() => setModelOpen(val => !val)} className="btn btn-primary head-4 d-flex items-center cursor-pointer mar-y-2">
                    <Icon className="mar-x-2 text-3" icon="ant-design:plus-circle-outlined" />
                    Add New Habbits
                </button>
            </div>
        </main>
    )
}