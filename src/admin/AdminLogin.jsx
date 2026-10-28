import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, Code2, LockKeyhole} from 'lucide-react'
import api from '../api/axios.js'

const AdminLogin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try{
            await api.post('/auth/login', { email, password })
            navigate('/admin/dashboard', { replace: true })
            
        }catch(err){
             setError(err.response?.data?.message || 'Unable to sign in. Try again.')
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d19] px-4 text-white'>
        <div className='pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[100px]'/>
    <motion.div
     initial={{ opacity: 0, y: 24 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
         className='relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl'
    >
        <Link to='/' className='mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white'>
        <ArrowLeft size={16} /> Back to portfolio
        </Link>

        <div className='mb-7 flex items-center gap-3'>
            <div className='rounded-xl bg-blue-500/15 p-3 text-blue-400'>
            <LockKeyhole size={25} />
            </div>
            <div>
                <h1 className='text-2xl font-bold'>Admin access</h1>
                <p className='mt-1 text-sm text-slate-400'>Manage your developer portfolio</p>
            </div>
        </div>

        <form onSubmit={submitHandler} className='space-y-5'>
            <label className='block text-sm text-slate-300'>Email address
                <input
                type='email'
                autoComplete='username'
                required
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='your@example.com'
                className='mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-blue-500'
                />
            </label>
            <label className='block text-sm text-slate-300'>Password
                <input
                type='password'
                autoComplete='current-password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                className='mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-blue-500'
                />
            </label>

            {error && (
                <p role='alert' className='text-sm text-red-400'>
                    {error}
                </p>
            )}
            <button
              disabled={loading}
              className='flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50'
            >
                <Code2 size={18} />
                {loading? 'Signing in...': 'Sign in securely'}
            </button>

        </form>
    </motion.div>
       
    </div>
  )
}

export default AdminLogin