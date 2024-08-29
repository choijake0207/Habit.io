import axios from "axios"

export const register = async (firstName, lastName, email, password) => {
    const response = await axios.post("http://localhost:3001/user/register", {
        firstName,
        lastName,
        email,
        password
    })
    return response
}

export const authorizeUser = async () => {
    const response = await axios.get("http://localhost:3001/user/auth", {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
    })
    return response
}

export const login = async (email, password) => {
    const response = await axios.post("http://localhost:3001/user/login", {
        email,
        password
    })
    return response
}