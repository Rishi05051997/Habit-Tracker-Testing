import { createContext, useContext, useState, useReducer } from "react";
import { dataReducer } from "../../Reducers/Habbit/dataReducer";

const intialDataStateVal = {
    habits: [],
    archives: [],
    labels: [],

}



const habbitDataContext = createContext(intialDataStateVal);

const HabbitDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer, intialDataStateVal);
    const [toggleContent, setToggleContent] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [modelData, setModelData] = useState();
    const [showDescription, setShowDescription] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState();
    const [completed, setCompleted] = useState(0);
    const [showAddlabelModel, setShowAddLabelModel] = useState(false);

    return (
        <habbitDataContext.Provider value={{ state, dispatch, toggleContent, setToggleContent, modelOpen, setModelOpen, completed, setCompleted, showDescription, setShowDescription, modelData, setModelData, isEditable, setIsEditable, selectedHabit, setSelectedHabit, showAddlabelModel, setShowAddLabelModel }}>
            {
                children
            }
        </habbitDataContext.Provider>
    )
}

const useHabbitData = () => useContext(habbitDataContext);

export { intialDataStateVal, useHabbitData, HabbitDataProvider };