import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { useHabbitData } from "../../context/HabbitData/HabbitDataContext";
import { archiveHabitBasedHabitId, removeHabitbyHabitId, removeHabitFromArchive, unArchiveHabitBasedHabitId } from "../../services";
import "./pallet.css";

export const Pallet = ({ isPalletOpen, setIsPalletOpen, habit, isArchive }) => {
    const { dispatch, setIsEditable, setModelOpen, setModelData, setShowDescription } = useHabbitData();
    const { login } = useAuth();
    const navigate = useNavigate();

    const updateHabitHandler = (habit) => {
        setModelData(habit);
        setModelOpen(val => !val);
        setIsEditable(val => !val);
        setIsPalletOpen(val => !val);
        setShowDescription(val => !val);

        isArchive && archiveHabitBasedHabitId(dispatch, localStorage.getItem("token"), habit);
    }

    const archiveHandler = (dispatch, token, habit) => {
        setShowDescription(val => !val);
        archiveHabitBasedHabitId(dispatch, token, habit);
    }





    return isPalletOpen && (
        <>
            <div className="pallet">
                <ul className="pallet-list text-2 bold">
                    {
                        !isArchive && (
                            <div className="d-flex pallet-item pad-xs items-center">
                                <Icon className="iconify mar-x-2" icon="ci:edit" />
                                <li onClick={() => login ? updateHabitHandler(habit) : navigate("/login")}>Edit Habit</li>
                            </div>)
                    }
                    {
                        !isArchive && (
                            <div className="d-flex pallet-item pad-xs items-center">
                                <Icon className="iconify mar-x-2" icon="fluent:delete-20-regular" />
                                <li onClick={() => login ? (removeHabitbyHabitId(dispatch, localStorage.getItem("token"), habit), setShowDescription(val => !val)) : navigate("/login")}>Delete Habit</li>
                            </div>
                        )
                    }
                    {
                        !isArchive && (
                            <div className="d-flex pallet-item pad-xs items-center">
                                <Icon className="iconify mar-x-2" icon="bi:play-fill" />
                                <li onClick={() => login ? (navigate(`/pomodoro/${habit._id}`), setShowDescription(val => !val)) : navigate("/login")}>Pomodoro</li>
                            </div>
                        )
                    }

                    {
                        isArchive ? (<div className="d-flex pallet-item pad-xs items-center">
                            <Icon className="iconify mar-x-2" icon="bx:archive-out" />
                            <li onClick={() => login ? unArchiveHabitBasedHabitId(dispatch, localStorage.getItem("token"), habit) : navigate("/login")}>Unarchive Habit</li>
                        </div>) : (
                            <div className="d-flex pallet-item pad-xs items-center">
                                <Icon className="iconify mar-x-2" icon="bx:archive-in" />
                                <li onClick={() => login ? (archiveHandler(dispatch, localStorage.getItem("token"), habit), setShowDescription(val => !val)) : navigate("/login")}>Archive Habit</li>
                            </div>
                        )
                    }
                    {
                        isArchive && (
                            <div className="d-flex pallet-item pad-xs items-center">
                                <Icon className="iconify mar-x-2" icon="fluent:delete-20-regular" />
                                <li onClick={() => login ? removeHabitFromArchive(dispatch, localStorage.getItem("token"), habit) : navigate("/login")}>Delete Archive Habit</li>
                            </div>
                        )
                    }
                </ul>
            </div>

        </>


    )
}