import { Icon } from "@iconify/react";
import "./habitsListingCard.css";
import { useHabbitData } from "../../context/HabbitData/HabbitDataContext";
import { useState } from "react";
import { Pallet } from "../../components/Pallet/Pallet";

export const HabitsListingCard = ({ habit, isArchive }) => {
    const { name, times } = habit;
    const { setShowDescription, setSelectedHabit } = useHabbitData();
    const [isPalletOpen, setIsPalletOpen] = useState();


    const onShowHabitDescription = (habit) => {
        setSelectedHabit(habit)
        setShowDescription(val => !val)
    }


    return (
        <div className="habit-listing-card d-flex  pad-sm cursor-pointer" onClick={() => onShowHabitDescription(habit)}>
            <div className="habit-header">
                <div className="head-3">{name}</div>
                <div className="text-2">0/{times}</div>
            </div>
            <div className="habit-rhs-nav d-flex">
                <button className="btn btn-secondory d-flex items-center cursor-pointer pos-relative">
                    <Icon icon="bi:three-dots-vertical" onClick={() => setIsPalletOpen(val => !val)} />
                    < Pallet isPalletOpen={isPalletOpen} setIsPalletOpen={setIsPalletOpen} habit={habit} isArchive={isArchive} />
                </button>
            </div>

        </div>
    )
}