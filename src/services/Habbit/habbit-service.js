import axios from "axios"

export const initAllHabbits = (token, dispatch) => {
    try {
        (async () => {
            const { data: { habits } } = await axios.get(
                `/api/habits`,
                {
                    headers: {
                        authorization: token
                    }
                }

            )
            habits && dispatch({ type: "INIT-HABBITS", payload: habits })
        })()
    } catch (error) {
        console.log(error)
    }
}

export const getHabbitBasedOnHabbitId = (habitId, token) => {
    try {
        (async () => {
            const { data: { habit } } = await axios.get(
                `/api/habits/${habitId}`,
                {
                    headers: {
                        authorization: token
                    }
                }

            )
            return habit
        })()
    } catch (error) {
        console.log(error)
    }
}

export const addNewHabit = (habitData, token, dispatch, navigate) => {
    const habitify = { habit: habitData }
    try {
        (async () => {
            const { data: { habits } } = await axios.post(
                `/api/habits`,
                JSON.stringify(habitify),
                {
                    headers: {
                        authorization: token
                    }
                }

            )
            habits && dispatch({ type: "ADD-HABIT", payload: habits });
            habits && navigate("/home");
        })()
    } catch (error) {
        console.log(error)
    }
}

export const removeHabitbyHabitId = (dispatch, token, habit) => {
    try {
        (async () => {
            const { data: { habits } } = await axios.delete(
                `/api/habits/${habit._id}`,
                {
                    headers: {
                        authorization: token
                    }
                }

            )
            debugger;
            habits && dispatch({ type: "REMOVE-HABIT-FROM-HABITS", payload: habits })
        })()
    } catch (error) {
        console.log(error)
    }
}

export const updateHabitBasedOnHabitId = (habitData, token, dispatch, navigate) => {
    const habitify = { habit: habitData }
    try {
        (async () => {
            const { data: { habits } } = await axios.post(
                `/api/habits/${habitData._id}`,
                JSON.stringify(habitify),
                {
                    headers: {
                        authorization: token
                    }
                }

            )
            habits && dispatch({ type: "UPADTE-HABIT-FROM-HABITS", payload: habits })
            habits && navigate("/home")
        })()
    } catch (error) {
        console.log(error)
    }
}



