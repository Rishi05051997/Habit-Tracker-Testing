import axios from "axios"

export const initArchiveHabits = (dispatch, token) => {
    try {
        (async () => {
            const { data: { archives } } = await axios.get(
                `/api/archives`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )

            console.log(archives, "ARCHIVING")
            // console.log(habits, "HABITS")
            archives && dispatch({ type: "INIT-ARCHIVE-HABIT", payload: archives })
        })()

    } catch (error) {
        console.log(error);
    }
}

export const archiveHabitBasedHabitId = (dispatch, token, habit) => {
    try {
        (async () => {
            const { data } = await axios.post(
                `/api/archives/${habit._id}`,
                {

                },
                {
                    headers: {
                        authorization: token
                    }
                }
            )

            console.log(data, "ARCHIVING")
            // console.log(habits, "HABITS")
            dispatch({ type: "ARCHIVE-HABIT", payload: data })
        })()

    } catch (error) {
        console.log(error);
    }
}


export const unArchiveHabitBasedHabitId = (dispatch, token, habit) => {
    try {
        (async () => {
            const { data } = await axios.post(
                `/api/archives/restore/${habit._id}`,
                {

                },
                {
                    headers: {
                        authorization: token
                    }
                }
            )

            console.log(data, "ARCHIVING")
            // console.log(habits, "HABITS")
            dispatch({ type: "ARCHIVE-HABIT", payload: data })
        })()

    } catch (error) {
        console.log(error);
    }
}


export const removeHabitFromArchive = (dispatch, token, habit) => {
    try {
        (async () => {
            const { data: { archives } } = await axios.delete(
                `/api/archives/${habit._id}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )

            // console.log(habits, "HABITS")
            dispatch({ type: "REMOVE-HABIT-FROM-ARCHIVE", payload: archives })
        })()

    } catch (error) {
        console.log(error);
    }
}



