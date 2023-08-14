import React, { FC, useEffect, useState } from 'react'
import { Avatar, Button, Card, Col, Divider, Modal, Select, Tooltip, Typography } from 'antd'
import HighPriority from '../../assets/vector/high.svg'
import LowPriority from '../../assets/vector/low.svg'
import MediumPriority from '../../assets/vector/medium.svg'
import useProject from '../../hooks/useProject'

var randomColor = Math.floor(Math.random() * 16777215).toString(16);

const { Paragraph } = Typography

type TicketCardType = {
    ticket: Ticket,
    refreshTicket: () => void
}

const TicketCard: FC<TicketCardType> = ({ ticket, refreshTicket }) => {
    const { assignUserToTicket, unAssignUserToTicket, getProjectDetailById } = useProject()
    const [showTicketDetail, setShowTicketDetail] = useState(false)
    const [project, setProject] = useState<Project | null>()

    useEffect(() => {
        getProjectDetail()
    }, [])

    const assignTicketToUser = async (userId: string) => {
        await assignUserToTicket(ticket._id, userId)
        refreshTicket()
    }

    const unAssignTicketToUser = async () => {
        await unAssignUserToTicket(ticket._id)
        await refreshTicket()
    }

    const getProjectDetail = async () => {
        setProject(await getProjectDetailById(ticket.project))
    }

    const getUsersOptions = (): any => {
        if ((project?.collaborators?.length || 0) > 0) {
            return project?.collaborators.map((collaborator: any) => {
                return { value: collaborator._id, label: collaborator.username }
            })
        }
        return []
    }

    return (
        <Col key={ticket._id} span={8}>
            <Card onClick={() => setShowTicketDetail(prev => !prev)} className='cursor-pointer mt-5' title={ticket.name} bordered={false}>
                <p className='line-clamp-2 text-start'>{ticket.description}</p>
                <div className='flex mt-5 justify-end gap-3 items-center min-h-[30px]'>
                    <Tooltip title={`Priority ${ticket.priority}`}>
                        {ticket.priority === "low" &&
                            <img src={LowPriority} width={15} alt="Hightest priority" />
                        }
                        {ticket.priority === "high" &&
                            <img src={HighPriority} width={15} alt="Hightest priority" />
                        }
                        {ticket.priority === "medium" &&
                            <img src={MediumPriority} width={15} alt="Hightest priority" />
                        }
                    </Tooltip>
                    {ticket.assignedTo ?
                        <Tooltip title={`Assigned to ${ticket.assignedTo._id}`}>
                            <Avatar style={{ background: `#${randomColor}` }} >
                                {ticket.assignedTo.username.substring(0, 2).toUpperCase()}
                            </Avatar>
                        </Tooltip> : <></>}
                </div>
            </Card>
            <Modal
                title={ticket.name}
                open={showTicketDetail}
                onOk={() => setShowTicketDetail(false)}
                confirmLoading={false}
                okButtonProps={{ type: 'default' }}
                onCancel={() => setShowTicketDetail(false)}
            >
                <Paragraph>{ticket.name}</Paragraph>
                <Divider />
                <div>
                    <div className='flex gap-3 items-center'>
                        <p>Assign ticket to: </p>
                        <div className='flex gap-2'>
                            <Select
                                defaultValue={ticket.assignedTo?._id || "null"}
                                style={{ width: 120 }}
                                onChange={(value) => {
                                    if (value === "null") return unAssignTicketToUser()
                                    assignTicketToUser(value)
                                }}
                                options={[
                                    { value: 'null', label: 'None' },
                                    ...getUsersOptions()
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </Col>
    )
}

export default TicketCard