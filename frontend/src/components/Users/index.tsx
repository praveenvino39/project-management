import React, { useEffect, useState } from 'react'
import useProject from '../../hooks/useProject'
import { useLocation } from 'react-router-dom';
import { Card, Col, Row, Tooltip } from 'antd';
import TicketCard from '../TicketCard';
import AddTicketModal from '../AddTicketModal';
import AddUserModal from '../AddUserModal';
import { LoadingOutlined } from '@ant-design/icons';

function Users({ projecId }: any) {
    const { state: project } = useLocation();
    const { getProjectDetailById } = useProject()
    const [projectUsers, setProjectUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getDetails()
    }, [])

    const getDetails = async () => {
        const details = await getProjectDetailById(project._id)
        setProjectUsers(details.collaborators ?? [])
        setLoading(false)
    }
    return (
        <div>
            <h1 className="text-3xl flex mt-5 mx-auto">
                <div className='flex-1'></div>
                Users
                <div className='flex-1 flex justify-end'>
                    <AddUserModal projectUsers={[...projectUsers]} refreshUser={getDetails} projecId={project._id} />
                </div>
            </h1>
            {loading ? <LoadingOutlined /> : <>
                <Row gutter={16} className='items-stretch'>
                    {projectUsers.map((user) =>
                        <Col key={user._id} span={8}>
                            <Card headStyle={{ display: 'none' }} onClick={() => { }} className='cursor-pointer mt-5' title={user.username} bordered={false}>
                                <div className='flex mt-5 justify-center gap-3 items-center min-h-[0px]'>
                                    <p className='text-center'>{user.username}</p>
                                </div>
                            </Card>
                        </Col>
                    )
                    }
                </Row>
                {projectUsers.length === 0 && <p className='text-sm mt-5'>No users available, Please add one</p>}
            </>}

        </div>
    )
}

export default Users