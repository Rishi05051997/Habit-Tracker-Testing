export const seachBasedOnInput = (habits, search) => {
    return search
        ? [...habits].filter((habit) => habit.name.toLowerCase().includes(search.toLowerCase()))
        : [...habits];
}