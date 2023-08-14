import { Button, Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import useProject from '../../hooks/useProject'
import { useNavigate } from 'react-router-dom'
import AddProjectModal from '../AddProjectModal'
import { LoadingOutlined } from '@ant-design/icons'
import useAuth from '../../hooks/useAuth'

function ProjectList() {
    const navigate = useNavigate()
    const { getProjectForUser } = useProject()
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProjects()
    }, [])

    const gotoProjectHandler = (project: any) => {
        navigate(`/project`, {
            state: project
        })
    }
    const getProjects = async () => {
        setProjects(await getProjectForUser())
        setLoading(false)
    }
    return (
        <div>
            <h1 className="text-3xl mt-5 flex">
                <div className='flex-1'>
                </div>
                Your projects
                <div className='flex-1 flex justify-end'>
                    <AddProjectModal refreshProjects={getProjects} />
                </div>
            </h1>
            <div className='mt-3'>
                <div className='px-5'>
                    {loading ? <LoadingOutlined /> : <>
                        <Row gutter={16}>
                            {projects.map((project) =>
                                <Col key={project._id} onClick={() => gotoProjectHandler(project)} span={8}>
                                    <Card className='cursor-pointer mt-5' title={project.name} bordered={false}>
                                        {project.tickets.length > 0 ? `${project.tickets.length} tickets available` : 'No tickets available'}
                                    </Card>
                                </Col>)
                            }
                        </Row>
                        {projects.length === 0 && <p className='text-sm mt-5'>No project available, Please add one</p>}

                    </>}

                </div>
            </div>
        </div>
    )
}

export default ProjectList