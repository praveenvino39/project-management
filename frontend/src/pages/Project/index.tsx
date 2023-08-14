import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useProject from '../../hooks/useProject';
import { SideNav } from '../../components/SideNav';
import Tickets from '../../components/Tickets';
import Users from '../../components/Users';

function ProjectScreen() {
    const [selectedTabs, setSelectedTabs] = useState<'tickets' | 'users'>('tickets')



    return (
        <div className='flex items-start gap-5'>
            <nav>
                <SideNav onClick={(tab) => setSelectedTabs(tab)} />
            </nav>
            <h1 className="text-3xl mt-5 flex-1">
                {selectedTabs === "tickets" ? <Tickets /> : <Users />}
            </h1>
            <div>
            </div>
        </div>
    )
}

export default ProjectScreen