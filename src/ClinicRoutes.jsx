import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './pages/Login/LoginForm'
import AppointmentCalendar from './pages/Dashboard/AppointmentCalendar'
import ProtectedRoute from './components/ProtectedRoute'

function ClinicRoutes() {
  return (
    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/calendar' element={
        <ProtectedRoute>
          <AppointmentCalendar />
        </ProtectedRoute>} />
    </Routes>
  )
}

export default ClinicRoutes
