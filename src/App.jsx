import React from 'react'
import AdminLogin from './admin/AdminLogin'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './admin/Dashboard'
import RequiredAdmin from './routes/RequiredAdmin'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<AdminLogin />} />
      <Route
        path='/admin/dashboard'
        element={
          <RequiredAdmin>
            <Dashboard />
          </RequiredAdmin>
        }
      />
      
      
    </Routes>
      
    
    </>
  )
}

export default App