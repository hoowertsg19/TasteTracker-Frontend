import axios from 'axios'

// Configuración base de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Interceptor para agregar token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para debug (ver qué se está llamando)
api.interceptors.request.use((config) => {
  console.log('🚀 Request:', config.method?.toUpperCase(), config.url)
  console.log('🚀 Full URL:', (config.baseURL || '') + (config.url || ''))
  console.log('🚀 Params:', config.params)
  return config
})

// Interceptor para ver respuestas y errores
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.data)
    return response
  },
  (error) => {
    console.error('❌ Error:', error.response?.status, error.response?.data || error.message)
    console.error('❌ URL que falló:', error.config?.url)
    return Promise.reject(error)
  },
)

// API de autenticación
export const authAPI = {
  // Verificar si email existe
  checkEmail: async (email: string): Promise<{ exists: boolean; message: string }> => {
    try {
      const response = await api.get('/auth/check-email', {
        params: { email },
      })
      return response.data
    } catch (error: any) {
      console.error('Error checking email:', error)

      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        return {
          exists: false,
          message: 'No se puede conectar con el servidor',
        }
      }

      return {
        exists: false,
        message: error.response?.data?.message || 'Error de conexión',
      }
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },
}

export default api
