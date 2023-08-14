import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useNavigation } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function RegisterPage() {
    const { registerUser } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const registerUserHandler = async (event: any) => {
        event.preventDefault()
        const isSuccess = await registerUser(username, password)
        if(isSuccess){
            navigate('/login')
        }
    }

    return (
        <div className='px-52'>
            <form onSubmit={registerUserHandler}>
                <h1 className='text-3xl mt-4'>Create User</h1>
                <Input required value={username} onChange={(event) => setUsername(event.target.value)} size="large" placeholder="Username" prefix={<UserOutlined />} className='mt-4' />
                <Input required value={password} onChange={(event) => setPassword(event.target.value)} size="large" type='password' placeholder="Password" prefix={<LockOutlined />} className='mt-4' />
                <Button htmlType='submit' className='mt-4'>Register</Button>
            </form>

        </div>
    )
}

export default RegisterPage