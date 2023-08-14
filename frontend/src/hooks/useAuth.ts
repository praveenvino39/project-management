import axios, { AxiosError } from 'axios'
import React from 'react'
import useStorage from './useStorage'
import { toast } from 'react-hot-toast'

function useAuth() {

    const { setAuthToken, getAuthToken, removeToken } = useStorage()

    const loginUser = async (username: string, password: string) => {
        try {
           const { data } = await axios.post<NetworkResponse<string>>("http://localhost:3000/users/login", { username, password })
        const { data: token, status } = data
        if(status === 200){
            setAuthToken(token)
            return true
        }
        return false  
        } catch (error:any) {
            alert("Invalid username or password")
            return false
        }
       
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
            const { data } = await axios.post<NetworkResponse<User>>("http://localhost:3000/users", { username, password })
            const {status, message} = data
            if(status === 201){
                alert(message)
                return true
            }
        } catch (error:any) {
            alert(error.response?.data.error)
            return false
        }
    }

    const checkAuth = () => {
        const isLoggedIn = getAuthToken()
        if (isLoggedIn) {
            return true
        }
        return false
    }

    const logoutUser = () => {
        removeToken()
        window.location.href = "/"
    }
    return {
        loginUser,
        checkAuth,
        registerUser,
        getAllUsers,
        logoutUser
    }
}

export default useAuth