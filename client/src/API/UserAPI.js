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