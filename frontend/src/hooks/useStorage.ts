import React from 'react'

function useStorage() {

    const setAuthToken = (token: string) => {
        localStorage.setItem("TOKEN", token)
    }

    const getAuthToken = () => {
        return localStorage.getItem("TOKEN")
    }
    const removeToken = () => {
        return localStorage.removeItem("TOKEN")
    }
    return {
        setAuthToken,
        getAuthToken,
        removeToken
    }
}

export default useStorage