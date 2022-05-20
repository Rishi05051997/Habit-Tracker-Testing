export const dataReducer = (state, action) => {
    console.log(action.payload)
    switch (action.type) {
        case "INIT-HABBITS":
            return {
                ...state,
                habits: action.payload
            }
        case "ADD-HABIT":
            return {
                ...state,
                habits: action.payload,
            }

        case "REMOVE-HABIT-FROM-HABITS":
            return {
                ...state,
                habits: action.payload,
            }

        case "UPADTE-HABIT-FROM-HABITS":
            return {
                ...state,
                habits: action.payload,
            }

        case "ADD-NOTE-TO-SELECTED-HABIT":
            return {
                ...state,
                habits: state.habits.map((habit) => (
                    habit._id === action.payload._id ? { ...habit, notes: habit.notes.concat(action.payload.note) } : habit
                )),
            }

        case "REMOVE-NOTE-FROM-SELECTED-HABIT":
            return {
                ...state,
                habits: state.habits.map((habit) => (
                    habit._id === action.payload._id ? { ...habit, notes: habit.notes.filter(({ _id }) => _id !== action.payload.noteId) } : habit
                )),
            }

        case "INIT-LABELS":
            return {
                ...state,
                labels: action.payload
            }

        case "SET-LABELS":
            return {
                ...state,
                labels: action.payload
            }


        case "INIT-ARCHIVE-HABIT":
            return {
                ...state,
                archives: action.payload
            }

        case "ARCHIVE-HABIT":
            return {
                ...state,
                habits: action.payload.habits,
                archives: action.payload.archives
            }

        case "REMOVE-HABIT-FROM-ARCHIVE":
            return {
                ...state,
                archives: action.payload
            }
        case "TOGGLE-TIME":
            return {
                ...state,
                habits: [...state.habits].map((habit) => (
                    habit._id === action.payload.habitId ? { ...habit, workMinutes: action.payload.workMinutes, breakMinutes: action.payload.breakMinutes } : habit
                ))
            };

        case "POMODORO-SUCCESS-COUNTER":
            return {
                ...state,
                habits: [...state.habits].map((habit) => (
                    habit._id === action.payload.habitId ? { ...habit, successCounter: habit.successCounter + Number(action.payload.counter), totalAttemptsCounter: habit.totalAttemptsCounter + Number(action.payload.counter) } : habit
                ))
            };

        case "POMODORO-FAILURE-COUNTER":
            return {
                ...state,
                habits: [...state.habits].map((habit) => (
                    habit._id === action.payload.habitId ? { ...habit, failureCounter: habit.failureCounter + Number(action.payload.counter), totalAttemptsCounter: habit.totalAttemptsCounter + Number(action.payload.counter) } : habit
                ))
            };



        case "POMODORO-SKIPPED-COUNTER":
            return {
                ...state,
                habits: [...state.habits].map((habit) => (
                    habit._id === action.payload.habitId ? { ...habit, skippedCounter: habit.skippedCounter + Number(action.payload.counter), totalAttemptsCounter: habit.totalAttemptsCounter + Number(action.payload.counter) } : habit
                ))
            };

        case "POMODORO-TOTAL-TIME":
            return {
                ...state,
                habits: [...state.habits].map((habit) => (
                    habit._id === action.payload.habitId ? { ...habit, totalTimeAllocatedToCompleteHabit: [...habit.totalTimeAllocatedToCompleteHabit].concat(action.payload.time) } : habit
                ))
            };

        case "POMODORO-TIME-LOGGER":
            return {
                ...state,
                habits: [...state.habits].map((habit) => (
                    habit._id === action.payload.habitId ? { ...habit, timeTakenToCompleteHabitInMins: [...habit.timeTakenToCompleteHabitInMins].concat(action.payload.time) } : habit
                ))
            };






        default:
            break;
    }
}