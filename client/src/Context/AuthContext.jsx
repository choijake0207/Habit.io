import React, { createContext, useState, useEffect } from 'react'
import { register as registerAPI, authorizeUser as authorizeAPI, login as loginAPI } from '../API/UserAPI'

export const AuthContext = createContext("")
export const AuthProvider = ({children}) => {
    const [authorizedUser, setAuthorizedUser] = useState({email: "", id: "", firstName: "", authStatus: false})
    const [loading, setLoading] = useState(true)
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
                setAuthorizedUser({email: response.data.email, id: response.data.id, firstName: response.data.firstName, authStatus: true })
            } catch (error) {
                setAuthorizedUser({email: "", id: "", authStatus: false})
                throw(error)
            } finally {
                setLoading(false)
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
    // logout
    const logout = () => {
        localStorage.removeItem("accessToken")
        setAuthorizedUser({email: "", id: "", authStatus: false})
    }


    const values = {register, authorizedUser, login, logout, loading}
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
