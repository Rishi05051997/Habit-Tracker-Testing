import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { useHabbitData } from "../../context/HabbitData/HabbitDataContext";
import { addNewLabel, deleteLabelbyLabelName } from "../../services";
import "./addLabelModal.css";

export const AddLabelsModal = () => {
    const { setShowAddLabelModel, dispatch, state: { labels } } = useHabbitData();
    const [labelText, setLabeltext] = useState("");
    const [labelArr, setLabelArr] = useState([]);

    const labelhandler = (e) => {
        setLabeltext(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (['Enter', 'Tab', ','].includes(e.key)) {
            e.preventDefault();

            let lebelVal = labelText.trim();
            // const labelObj = { value: lebelVal, label: lebelVal }
            // if (lebelVal) {
            //     setLabelArr(val => [...val, labelObj]);
            // }
            addNewLabel(dispatch, localStorage.getItem("token"), lebelVal)
        }
    }


    const AddLabelFormHandler = (e) => {
        e.preventDefault();
        // dispatch({ type: "SET-LABELS", payload: labelArr })
        setShowAddLabelModel(val => !val)
    }
    return (
        <>
            <div className="modal-content pad-md pos-relative">
                <div className="close-icon head-2 cursor-pointer">
                    <Icon icon="ant-design:close-circle-outlined" onClick={() => setShowAddLabelModel(val => !val)} />
                </div>
                <form onSubmit={AddLabelFormHandler}>
                    <div className="d-flex flex-col w-100">
                        <div className="head-2" onClick={() => setShowAddLabelModel(val => !val)}>
                            ADD LABEL
                        </div>
                        {/* {
                        errorMsg && (
                            <div className="error-msg mar-y-2 head-4">{errorMsg}</div>
                        )
                    } */}
                        <div className="d-flex text-2 flex-col mar-y-2">
                            <label htmlFor="name">LABEL</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Please Enter Label Here"
                                className="form-control mar-y-2 pad-xs  d-flex  justify-center"
                                value={labelText}
                                onChange={labelhandler}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                    </div>

                </form>
                <div className="chips-container mar-y-4">
                    {
                        labels.length > 0 &&

                        (
                            labels.map((label, i) =>
                                <button key={i} className="chips-btn" >
                                    <p>{label}</p> <Icon className="iconify cursor-pointer" onClick={() => deleteLabelbyLabelName(dispatch, localStorage.getItem("token"), label)} icon="akar-icons:circle-x" />

                                </button>
                            )
                        )


                    }
                </div>

            </div>
            <div className="overlay"></div>
        </>
    )
}