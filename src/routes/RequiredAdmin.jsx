import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../api/axios.js'

const RequiredAdmin = ({ children }) => {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    let active = true

    api.get('/auth/me')
      .then(() => {
        if (active) setStatus('authenticated')
      })
      .catch((error) => {
        if (!active) return

        if (error.response?.status === 401 || error.response?.status === 403) {
          setStatus('unauthenticated')
          return
        }

        setStatus('error')
      })

    return () => {
      active = false
    }
  }, [])

  if (status === 'checking') {
    return <p className="min-h-screen bg-[#080d19] p-8 text-slate-300">Checking admin access...</p>
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />
  }

  if (status === 'error') {
    return (
      <main className="min-h-screen bg-[#080d19] p-8 text-red-300">
        Could not verify admin access. Check that the server is running, then reload.
      </main>
    )
  }

  return children
}

export default RequiredAdmin