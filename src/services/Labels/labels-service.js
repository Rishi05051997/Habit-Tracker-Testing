import axios from "axios";

export const deleteLableHandler = (e, val, setLabelArr) => {
    e.preventDefault();
    setLabelArr(lab => [...lab].filter(({ value }) => value !== val));
}
export const editLebaleHandler = (e, val, setLabelArr, setLabels) => {
    e.preventDefault();
    setLabelArr(lab => [...lab].filter(({ value }) => value !== val));
    setLabels(val)

}

export const initAllLabels = (dispatch, token) => {
    try {
        (async () => {
            const { data: { labels } } = await axios.get(
                `/api/labels`,
                {
                    headers: {
                        authorization: token
                    }
                }

            )
            labels && dispatch({ type: "INIT-LABELS", payload: labels })
        })()
    } catch (error) {
        console.log(error)
    }
}

export const addNewLabel = (dispatch, token, labelName) => {
    try {
        (async () => {
            const { data: { labels } } = await axios.post(
                `/api/labels/${labelName}`,
                {

                },
                {
                    headers: {
                        authorization: token
                    }
                }

            )
            labels && dispatch({ type: "SET-LABELS", payload: labels })
        })()
    } catch (error) {
        console.log(error)
    }
}

export const deleteLabelbyLabelName = (dispatch, token, labelName) => {
    debugger;
    try {
        (async () => {
            const { data: { labels } } = await axios.delete(
                `/api/labels/${labelName}`,
                {
                    headers: {
                        authorization: token
                    }
                }

            )
            labels && dispatch({ type: "SET-LABELS", payload: labels })
        })()
    } catch (error) {
        console.log(error)
    }
}