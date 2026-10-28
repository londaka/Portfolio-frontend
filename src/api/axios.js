import axios from 'axios'

const configuredApiUrl = import.meta.env.VITE_API_URL || '/api'
const baseURL = configuredApiUrl.replace(/\/+$/, '').endsWith('/api')
    ? configuredApiUrl
    : `${configuredApiUrl.replace(/\/+$/, '')}/api`

const api = axios.create({
    baseURL,
    withCredentials: true
})

export default api