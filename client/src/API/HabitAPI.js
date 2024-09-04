import axios from "axios"
export const createHabit = async (name, startDate) => {
    const response = await axios.post("http://localhost:3001/habit", {
        name,
        startDate
    }, {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
    return response
}

export const fetchAllHabits = async () => {
    const response = await axios.get("http://localhost:3001/habit", {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
    return response
}

export const fetchSingleHabit = async (id) => {
    const response = await axios.get(`http://localhost:3001/habit/${id}`, {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
    return response
}

export const deleteHabit = async (id) => {
    const response = await axios.delete(`http://localhost:3001/habit/${id}`, {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
    return response
}