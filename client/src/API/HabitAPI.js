import axios from "axios"
export const createHabit = async (name, startDate, color) => {
    const response = await axios.post("http://localhost:3001/habit", {
        name,
        startDate,
        color
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
    const response = await axios.delete(`http://localhost:3001/habit/delete/${id}`, {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
    return response
}

export const resetHabit = async (id) => {
    const response = await axios.put(`http://localhost:3001/habit/reset/${id}`,{}, {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
    return response
}

export const pauseHabit = async (id) => {
    const response = await axios.put(`http://localhost:3001/habit/pause/${id}`, {}, {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
    return response
}

export const createGoal = async (id, goal) => {
    const response = await axios.post(`http://localhost:3001/habit/goal/${id}`, {
        goal
    },  {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
    return response
}

export const updateGoal = async (id) => {
    const response = await axios.put(`http://localhost:3001/habit/goal/${action}/${id}`, {}, {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
    return response

}