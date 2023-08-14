import axios from 'axios'
import React from 'react'
import useStorage from './useStorage'

function useProject() {
    const { getAuthToken } = useStorage()
    const getProjectForUser = async () => {
        const { data } = await axios.get("http://localhost:3000/projects", {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        console.log(data)
        return data
    }


    const getTicketsByProjectId = async (projectId: string) => {
        const { data } = await axios.get(`http://localhost:3000/tickets/${[projectId]}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        console.log(data)
        return data
    }

    const getProjectDetailById = async (projectId: string) => {
        const { data } = await axios.get(`http://localhost:3000/projects/${projectId}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        console.log(data)
        return data
    }

    const assignUserToTicket = async (ticketId: string, userId: string) => {
        const { data } = await axios.patch(`http://localhost:3000/tickets/${ticketId}?user=${userId}`, {}, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        console.log(data)
        return data
    }

    const unAssignUserToTicket = async (ticketId: string) => {
        const { data } = await axios.delete(`http://localhost:3000/tickets/${ticketId}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        console.log(data)
        return data
    }

    const createTicket = async (projectId: string, name: string, description: string, priority: string) => {
        const { data } = await axios.post(`http://localhost:3000/tickets`, {
            name,
            description,
            priority,
            project: projectId
        }, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        console.log(data)
        return data
    }

    const createProject = async (name: string) => {
        const { data } = await axios.post(`http://localhost:3000/projects`, {
            name,
        }, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        console.log(data)
        return data
    }

    const addUsersToProject = async (projectId: string, users: string[]) => {
        const { data } = await axios.patch(`http://localhost:3000/projects/add-users/${projectId}`, {
            users
        }, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
        console.log(data)
        return data
    }
    return {
        getProjectForUser,
        getTicketsByProjectId,
        assignUserToTicket,
        unAssignUserToTicket,
        getProjectDetailById,
        createTicket,
        addUsersToProject,
        createProject
    }
}

export default useProject