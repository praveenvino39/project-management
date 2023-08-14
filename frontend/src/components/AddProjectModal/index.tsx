import { Button, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import useProject from '../../hooks/useProject'
import { toast } from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'

function AddProjectModal({ refreshProjects }: any) {
    const [showAddProjectModal, setShowAddProjectModal] = useState(false)
    const [title, settitle] = useState("")
    const { createProject } = useProject()
    const { logoutUser } = useAuth()


    const addTicketHandler = async (event: any) => {
        try {
            event.preventDefault()
            await createProject(title)
            settitle("")
            await refreshProjects()
            setShowAddProjectModal(false)
        } catch (error) {
            alert("Error")
        }

    }
    return (
        <div>
            <Button className='mr-10' onClick={() => setShowAddProjectModal(true)}>Add Project</Button>
            <Button className='mr-10' onClick={() => logoutUser()}>Logout</Button>

            <Modal
                title={'Add Project'}
                open={showAddProjectModal}
                footer={() => <></>}
                onOk={() => setShowAddProjectModal(false)}
                confirmLoading={false}
                okButtonProps={{ type: 'default' }}
                onCancel={() => setShowAddProjectModal(false)}
            >
                <form onSubmit={addTicketHandler}>
                    <Input value={title} onChange={(event) => settitle(event.target.value)} size="large" placeholder="Title" className='mt-4' />

                    <div className='flex gap-5 justify-end'>
                        <Button htmlType="submit" className='mt-5'>Add</Button>
                        <Button onClick={() => setShowAddProjectModal(false)} className='mt-5'>Cancel</Button>
                    </div>
                </form>

            </Modal>
        </div>
    )
}

export default AddProjectModal