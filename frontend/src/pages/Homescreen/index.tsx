import React from 'react'
import ProjectList from '../../components/ProjectList'

function HomeScreen() {
    return (
        <div>
            <h1 className="text-3xl mt-5">
                Your projects
            </h1>
            <div className='mt-3'>
                <ProjectList />
            </div>
        </div>
    )
}

export default HomeScreen