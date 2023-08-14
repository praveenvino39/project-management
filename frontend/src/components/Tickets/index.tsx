import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useProject from '../../hooks/useProject';
import { Avatar, Button, Card, Col, Row, Tooltip } from 'antd';
import HighPriority from '../../assets/vector/high.svg'
import LowPriority from '../../assets/vector/low.svg'
import MediumPriority from '../../assets/vector/medium.svg'
import TicketCard from '../TicketCard';
import AddTicketModal from '../AddTicketModal';


function Tickets() {
    const { state: project } = useLocation();
    const { getTicketsByProjectId } = useProject()
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        getTickets()
    }, [])

    const getTickets = async () => {
        setTickets(await getTicketsByProjectId(project._id))
    }
    return (
        <div>
            <h1 className="text-3xl flex mt-5 mx-auto">
                <div className='flex-1'></div>
                Tickets
                <div className='flex-1 flex justify-end'>
                    <AddTicketModal refreshTicket={getTickets} projecId={project._id} />
                </div>
            </h1>
            <Row gutter={16} className='items-stretch'>
                {tickets.map((ticket: any) =>
                    <TicketCard refreshTicket={getTickets} key={ticket._id} ticket={ticket} project={project} />
                )
                }
            </Row>
        </div>
    )
}

export default Tickets