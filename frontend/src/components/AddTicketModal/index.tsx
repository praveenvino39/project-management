import { Button, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import useProject from '../../hooks/useProject'
import { toast } from 'react-hot-toast'

function AddTicketModal({ projecId, refreshTicket }: any) {
    const [showAddTicketModal, setShowAddTicketModal] = useState(false)
    const [title, settitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("low")
    const { createTicket } = useProject()

    const addTicketHandler = async (event: any) => {
        try {
            event.preventDefault()
            const result = await createTicket(projecId, title, description, priority)
            if (result) {
                settitle("")
                setDescription("")
                setPriority("low")
                await refreshTicket()
                setShowAddTicketModal(false)
            }
        } catch (error) {
            alert("Error")
        }

    }
    return (
        <div>
            <Button onClick={() => setShowAddTicketModal(true)}>Add Ticket</Button>
            <Modal
                title={'Add Ticket'}
                open={showAddTicketModal}
                footer={() => <></>}
                onOk={() => setShowAddTicketModal(false)}
                confirmLoading={false}
                okButtonProps={{ type: 'default' }}
                onCancel={() => setShowAddTicketModal(false)}
            >
                <form onSubmit={addTicketHandler}>
                    <Input value={title} onChange={(event) => settitle(event.target.value)} size="large" placeholder="Title" className='mt-4' />
                    <Input value={description} onChange={(event) => setDescription(event.target.value)} size="large" placeholder="Description" className='mt-4' />
                    <div className='mt-4 flex gap-3 items-center'>
                        <p>Priority</p>
                        <Select
                            value={priority}
                            defaultValue={"low"}
                            style={{ width: 120 }}
                            onChange={(value) => {
                                setPriority(value)
                            }}
                            options={[
                                { value: 'low', label: 'Low' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'high', label: 'High' },
                            ]}
                        />
                    </div>
                    <div className='flex gap-5 justify-end'>
                        <Button htmlType="submit" className='mt-5'>Add</Button>
                        <Button onClick={() => setShowAddTicketModal(false)} className='mt-5'>Cancel</Button>
                    </div>
                </form>

            </Modal>
        </div>
    )
}

export default AddTicketModal