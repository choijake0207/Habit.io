import axios from "axios"

export const register = async (email, password) => {
    const response = await axios.post("http://localhost:3001/user/register", {
        email,
        password
    })
    return response
}