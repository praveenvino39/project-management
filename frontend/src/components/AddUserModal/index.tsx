import { Button, Input, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import useProject from '../../hooks/useProject'
import { toast } from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'

function AddUserModal({ projecId, refreshUser, projectUsers }: any) {
    const [showAddUserModel, setShowAddUserModal] = useState(false)
    const { addUsersToProject } = useProject()
    const { getAllUsers } = useAuth()
    const [users, setusers] = useState<any>([])
    const [selectedUser, setselectedUser] = useState<any>([])


    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const users = await getAllUsers()
        setusers(users)
    }

    const addTicketHandler = async (event: any) => {
        try {
            event.preventDefault()
            await addUsersToProject(projecId, selectedUser)
            await refreshUser()
            setShowAddUserModal(false)
        } catch (error) {
            alert("Error")
        }

    }

    const getUsersOptions = () => {
        return users.map((user: any) => {
            return { value: user._id, label: user.username }
        },)
    }

    const getExistingUser = () => {
        return projectUsers.map((user: any) => {
            return user._id
        })
    }
    return (
        <div>
            <Button onClick={() => setShowAddUserModal(true)}>Add User</Button>
            <Modal
                title={'Add Users'}
                open={showAddUserModel}
                footer={() => <></>}
                onOk={() => setShowAddUserModal(false)}
                confirmLoading={false}
                okButtonProps={{ type: 'default' }}
                onCancel={() => setShowAddUserModal(false)}
            >
                <form onSubmit={addTicketHandler}>
                    <div className='mt-4 flex gap-3 items-center'>
                        <p>Add user</p>
                        <Select
                            style={{ width: '80%' }}
                            mode="multiple"
                            defaultValue={getExistingUser()}
                            onChange={(value) => {
                                setselectedUser([...value])
                            }}
                            options={getUsersOptions()}
                        />
                    </div>
                    <div className='flex gap-5 justify-end'>
                        <Button htmlType="submit" className='mt-5'>Add</Button>
                        <Button onClick={() => setShowAddUserModal(false)} className='mt-5'>Cancel</Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddUserModal