import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { useHabbitData } from "../../context/HabbitData/HabbitDataContext";
import { addNewHabit, archiveHabitBasedHabitId, updateHabitBasedOnHabitId } from "../../services";
import "./addHabit.css";

const initialHabitState = {
    name: "",
    description: "",
    times: "1",
    startDate: "",
    endDate: "",
    isArchive: false,
    notes: [],
    selectedLabels: [],
    workMinutes: 25,
    breakMinutes: 5,
    successCounter: 0,
    failureCounter: 0,
    skippedCounter: 0,
    totalAttemptsCounter: 0,
    timeTakenToCompleteHabitInMins: [],
    totalTimeAllocatedToCompleteHabit: [],
}



export const AddHabbit = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { setModelOpen, dispatch, isEditable, setIsEditable, modelData, state: { labels } } = useHabbitData();
    const [habitData, setHabitData] = useState(initialHabitState);
    const [updateData] = useState(isEditable);
    const [errorMsg, setErrorMsg] = useState("");


    console.log(updateData)

    useEffect(() => {
        if (isEditable && modelData) {
            setHabitData(modelData)
        }
        setTimeout(() => {
            setIsEditable(false)
        }, 1000)
    }, [isEditable, modelData, setIsEditable])

    const habitFormHandler = (e) => {
        e.preventDefault();
        if (validationHandler(habitData)) {
            updateData ?
                login ? updateHabitBasedOnHabitId(habitData, localStorage.getItem("token"), dispatch, navigate) : navigate("/login") :
                login ? addNewHabit(habitData, localStorage.getItem("token"), dispatch, navigate) : navigate("/login")
            setModelOpen(val => !val)
        }

    }

    const deleteLabelbyLabelName = (e, labelName) => {
        e.preventDefault();
        labelName && setHabitData((habit) => ({
            ...habit,
            selectedLabels: [...habit.selectedLabels].filter((label) => label !== labelName)
        }))
    };




    const addLabelToHabit = (e, labelName) => {
        e.preventDefault();
        labelName && setHabitData((habit) => ({
            ...habit,
            selectedLabels: [...habit.selectedLabels].concat(labelName)
        }))
    }
    const validationHandler = (habitData) => {
        const { name, description, times, startDate, endDate } = habitData;
        if (name === "" || description === "" || times === "" || startDate === "" || endDate === "") {
            setErrorMsg(`Please enter all the details`);
            return false
        }
        return true
    }
    return (
        <>
            <div className="modal-content pad-md pos-relative">
                <div className="close-icon head-2 cursor-pointer">
                    <Icon icon="ant-design:close-circle-outlined" onClick={() => setModelOpen(val => !val)} />
                </div>
                <form onSubmit={habitFormHandler}>
                    <div className="d-flex flex-col w-100">
                        <div className="head-2" onClick={() => setModelOpen(val => !val)}>
                            New Habbit
                        </div>
                        {
                            errorMsg && (
                                <div className="error-msg mar-y-2 head-4">{errorMsg}</div>
                            )
                        }
                        <div className="d-flex text-2 flex-col mar-y-2">
                            <label htmlFor="name">NAME</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter Name Here"
                                className="form-control mar-y-2 pad-xs  d-flex  justify-center"
                                value={habitData.name}
                                onChange={(e) => setHabitData((habit) => ({
                                    ...habit,
                                    name: e.target.value
                                }))}
                            />
                        </div>
                        <div className="d-flex text-2 flex-col mar-y-2">
                            <label htmlFor="desc">DESCRIPTION</label>
                            <textarea
                                id="desc"
                                type="text"
                                placeholder="Enter Name Here"
                                className="form-control mar-y-2 pad-xs  d-flex  justify-center"
                                rows="5"
                                cols="5"
                                value={habitData.description}
                                onChange={(e) => setHabitData((habit) => ({
                                    ...habit,
                                    description: e.target.value
                                }))}
                            />
                        </div>

                        <div className="d-flex  text-2 mar-y-2 justify-between">
                            <div className="d-flex flex-col">
                                <label htmlFor="name">{`Work Time : ${habitData.workMinutes} mins `}</label>
                                <input
                                    name="workTime"
                                    type="range"
                                    min="1"
                                    max="60"
                                    className="form-control mar-y-2 pad-xs  d-flex  justify-center"
                                    value={habitData.workMinutes}
                                    onChange={(e) => setHabitData((habit) => ({
                                        ...habit,
                                        workMinutes: e.target.value
                                    }))}
                                />
                            </div>
                            <div className="d-flex flex-col">
                                <label htmlFor="name">{`Break Time : ${habitData.breakMinutes} mins`}</label>
                                <input
                                    name="breakTime"
                                    type="range"
                                    min="0"
                                    max="30"
                                    className="form-control mar-y-2 pad-xs  d-flex  justify-center"
                                    value={habitData.breakMinutes}
                                    onChange={(e) => setHabitData((habit) => ({
                                        ...habit,
                                        breakMinutes: e.target.value
                                    }))}
                                />
                            </div>

                        </div>
                        <div className="d-flex text-2 flex-col mar-y-2">
                            <label htmlFor="times">HOW MANNY TIME DO YOU WANT TO TAKE THIS CHALLENGE ?</label>
                            <input
                                id="times"
                                type="number"
                                min="1"
                                max="10"
                                placeholder="Enter Numbers"
                                className="form-control mar-y-2 pad-xs  d-flex  justify-center"
                                value={habitData.times}
                                onChange={(e) => setHabitData((habit) => ({
                                    ...habit,
                                    times: e.target.value
                                }))}
                            />
                        </div>
                        <div className="d-flex text-2 justify-between  mar-y-2">
                            <div className="d-flex  flex-col">
                                <label htmlFor="startDate">START DATE</label>
                                <input
                                    id="startDate"
                                    type="date"
                                    className="form-control mar-y-2 pad-xs  d-flex  justify-center"
                                    value={habitData.startDate}
                                    onChange={(e) => setHabitData((habit) => ({
                                        ...habit,
                                        startDate: e.target.value
                                    }))}
                                />
                            </div>
                            <div className="d-flex  flex-col">
                                <label htmlFor="endDate">END DATE</label>
                                <input
                                    id="endDate"
                                    type="date"
                                    className="form-control mar-y-2 pad-xs  d-flex  justify-center"
                                    value={habitData.endDate}
                                    onChange={(e) => setHabitData((habit) => ({
                                        ...habit,
                                        endDate: e.target.value
                                    }))}
                                />
                            </div>
                        </div>
                        {
                            labels.length > 0 &&
                            (<>
                                <div className="head-4">Please Select Labels from Here</div>
                                <div className="chips-content mar-y-2">
                                    {
                                        labels.map((label, i) =>
                                            <button key={i} className="chips-btn cursor-pointer" onClick={(e) => addLabelToHabit(e, label)} >
                                                <p>{label}</p>
                                            </button>
                                        )
                                    }
                                </div>
                            </>)
                        }

                        {
                            habitData.selectedLabels.length > 0 &&
                            (<>
                                <div className="head-4">Selected Labels</div>
                                <div className="chips-content mar-y-2">

                                    {
                                        habitData.selectedLabels.map((label, i) =>
                                            <button key={i} className="chips-btn" >
                                                <p>{label}</p> <Icon className="iconify cursor-pointer" onClick={(e) => deleteLabelbyLabelName(e, label)} icon="akar-icons:circle-x" />

                                            </button>
                                        )
                                    }
                                </div>
                            </>)
                        }

                    </div>
                    <hr className="hr-modal mar-y-2" />

                    <div className="modal-footer">
                        {
                            updateData && (<>
                                <button className="btn btn-primary mar-x-2 cursor-pointer" onClick={() => archiveHabitBasedHabitId(dispatch, localStorage.getItem("token"), habitData)}>
                                    Archive
                                </button>
                            </>)
                        }
                        <button className="btn btn-primary mar-x-2 cursor-pointer" onClick={() => setModelOpen(val => !val)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary cursor-pointer">
                            {
                                updateData ? "Update" : "Submit"
                            }
                        </button>
                    </div>
                </form>

            </div>
            <div className="overlay"></div>
        </>
    )
}