import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import useProject from '../../hooks/useProject'
import { useNavigate } from 'react-router-dom'

function ProjectList() {
    const navigate = useNavigate()
    const { getProjectForUser } = useProject()
    const [projects, setProjects] = useState<any>([])
    useEffect(() => {
        (async () => {
            setProjects(await getProjectForUser())
        })()
    }, [])

    const gotoProjectHandler = (project: any) => {
        navigate(`/project`, {
            state: project
        })
    }
    return (
        <div className='px-5'>
            <Row gutter={16}>
                {projects.map((project: any) =>
                    <Col key={project._id} onClick={() => gotoProjectHandler(project)} span={8}>
                        <Card className='cursor-pointer mt-5' title={project.name} bordered={false}>
                            {project.tickets.length > 0 ? `${project.tickets.length} tickets available` : 'No tickets available'}
                        </Card>
                    </Col>)
                }
            </Row>
        </div>
    )
}

export default ProjectList