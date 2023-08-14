import axios from 'axios'
import React from 'react'
import useStorage from './useStorage'

function useAuth() {

    const { setAuthToken, getAuthToken } = useStorage()

    const loginUser = async (username: string, password: string) => {
        const { data } = await axios.post<string>("http://localhost:3000/users/login", { username, password })
        setAuthToken(data)
    }

    const getAllUsers = async () => {
        const { data } = await axios.get<User>("http://localhost:3000/users/all", {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        return data
    }

    const registerUser = async (username: string, password: string) => {
        try {
            const { data } = await axios.post<User>("http://localhost:3000/users", { username, password })
            console.log(data)
        } catch (error) {
            throw error
        }
    }

    const checkAuth = () => {
        const isLoggedIn = getAuthToken()
        if (isLoggedIn) {
            return true
        }
        return false
    }
    return {
        loginUser,
        checkAuth,
        registerUser,
        getAllUsers
    }
}

export default useAuth