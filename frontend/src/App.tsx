import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { SideNav } from './components/SideNav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/Homescreen'
import LoginPage from './pages/Login'
import AuthProvider from './provider/AuthProvider'
import RegisterPage from './pages/Register'
import ProjectScreen from './pages/Project'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/project" element={<ProjectScreen />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </AuthProvider>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
