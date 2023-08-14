import React, { ReactNode, useEffect, useRef } from 'react'
import useAuth from '../hooks/useAuth'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function AuthProvider({ children }: { children: ReactNode }) {

    const { checkAuth } = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        const loggedIn = checkAuth()
        if (!loggedIn) {
            if (pathname === "/register") {
                return
            }
            return navigate("/login")
        }
        if (pathname === "/login") {
            return navigate("/")
        }
        if (pathname === "/register") {
            return navigate("/")
        }
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthProvider