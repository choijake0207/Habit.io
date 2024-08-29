import React, { createContext, useState, useEffect } from 'react'
import { register as registerAPI, authorizeUser as authorizeAPI, login as loginAPI } from '../API/UserAPI'

export const AuthContext = createContext("")
export const AuthProvider = ({children}) => {
    const [authorizedUser, setAuthorizedUser] = useState({email: "", id: "", authStatus: false})
    // register
    const register = async (firstName, lastName, email, password) => {
        try {
            const response = await registerAPI(firstName, lastName, email, password)
            console.log(response.data)
            localStorage.setItem("accessToken", response.data.accessToken)
            setAuthorizedUser({email: response.data.email, id: response.data.id, authStatus: true})
        } catch (error) {
            throw(error)
        }
    }
    // auth check
    useEffect(() => {
        const authorizeUser = async () => {
            try {
                const response = await authorizeAPI()
                setAuthorizedUser({email: response.data.email, id: response.data.id, authStatus: true })
            } catch (error) {
                setAuthorizedUser({email: "", id: "", authStatus: false})
                throw(error)
            }
        }
        authorizeUser()
    }, [])
    // login 
    const login = async (email, password) => {
        try {
            const response = await loginAPI(email, password)
            console.log(response.data)
            localStorage.setItem("accessToken", response.data.accessToken)
            setAuthorizedUser({email: response.data.username, id: response.data.id, authStatus: true})
        } catch (error) {
            throw(error)
        }
    }


    const values = {register, authorizedUser, login}
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
