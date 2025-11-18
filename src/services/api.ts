import axios from 'axios'

// Configuración base de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Interceptor para agregar token de autenticación (crítico)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers = config.headers || {}
      // @ts-expect-error axios header typing
      config.headers.Authorization = `Bearer ${token}`
      console.log('✅ Token agregado:', token.substring(0, 20) + '...')
    } else {
      console.warn('⚠️ No se encontró token en localStorage')
    }

    console.log('🚀 Request:', config.method?.toUpperCase(), config.url)
    console.log('🚀 Full URL:', (config.baseURL || '') + (config.url || ''))
    console.log('🚀 Params:', config.params)

    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor para ver respuestas y manejar errores 401
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.data)
    return response
  },
  (error) => {
    const status = error.response?.status
    console.error('❌ Error:', status, error.response?.data || error.message)
    console.error('❌ URL que falló:', error.config?.url)

    if (status === 401) {
      console.error('❌ Error 401: No autorizado')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  },
)

// API de autenticación
export const authAPI = {
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

  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (data: {
    token: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    const response = await api.post('/auth/reset-password', data)
    return response.data
  },

  me: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  logout: async () => {
    const response = await api.post('/auth/logout')
    return response.data
  },
}

export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats')
    return response.data
  },

  getVentasChart: async (dias: number = 7) => {
    const response = await api.get('/dashboard/ventas-chart', {
      params: { dias },
    })
    return response.data
  },

  getPedidosRecientes: async (limit: number = 5) => {
    const response = await api.get('/dashboard/pedidos-recientes', {
      params: { limit },
    })
    return response.data
  },

  getResumen: async () => {
    const response = await api.get('/dashboard/resumen')
    return response.data
  },
}

export default api
