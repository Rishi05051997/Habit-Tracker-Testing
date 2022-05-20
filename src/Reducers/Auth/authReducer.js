import { intialUserStateVal } from "../../context/Auth/AuthContext"


export const authReducer = (state, action) => {
    switch (action.type) {
        case "FIRSTNAME-SETTER":
            return {
                ...state,
                firstName: action.payload
            }

        case "LASTNAME-SETTER":
            return {
                ...state,
                lastName: action.payload
            }
        case "EMAIL-SETTER":
            return {
                ...state,
                email: action.payload
            }

        case "PASSWORD-SETTER":
            return {
                ...state,
                password: action.payload
            }

        case "EMPTY-USER-STATE":
            return {
                intialUserStateVal
            }

        default:
            return state;
    }
}