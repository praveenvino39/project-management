import React from 'react'

function useStorage() {

    const setAuthToken = (token: string) => {
        localStorage.setItem("TOKEN", token)
    }

    const getAuthToken = () => {
        return localStorage.getItem("TOKEN")
    }
    return {
        setAuthToken,
        getAuthToken
    }
}

export default useStorage