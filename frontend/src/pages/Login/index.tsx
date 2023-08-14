import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Link, useNavigate, useNavigation } from 'react-router-dom'

function LoginPage() {
    const { loginUser } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async (event: any) => {
        event.preventDefault()
        await loginUser(username, password)
        navigate('/')
    }

    return (
        <div className='px-52'>
            <form onSubmit={loginHandler}>
                <h1 className='text-3xl mt-4'>Login</h1>
                <Input value={username} onChange={(event) => setUsername(event.target.value)} size="large" placeholder="Username" prefix={<UserOutlined />} className='mt-4' />
                <Input value={password} onChange={(event) => setPassword(event.target.value)} size="large" type='password' placeholder="Password" prefix={<LockOutlined />} className='mt-4' />
                <Button htmlType='submit' className='mt-4'>Login</Button>
            </form>
            <p className='mt-5'>Don't have account, <Link to={'/register'}>Click here to create One</Link></p>
        </div>
    )
}

export default LoginPage