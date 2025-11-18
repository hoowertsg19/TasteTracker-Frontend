import { ref, computed } from 'vue'
import * as authService from '@/services/authService'
import { authAPI } from '@/services/api'
import type { LoginRequest, RegisterRequest, User } from '@/types/auth'

const user = ref<User | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const isAuthenticated = computed(() => user.value !== null)

async function login(credentials: LoginRequest) {
  loading.value = true
  error.value = null
  try {
    const res = await authAPI.login(credentials)

    // Guardar token explícitamente en localStorage (formato { token: '...' })
    if ((res as any).token) {
      localStorage.setItem('token', (res as any).token)
      authService.saveToken((res as any).token)
    }
    // Si tu backend usa access_token, descomenta y ajusta:
    // if ((res as any).access_token) {
    //   localStorage.setItem('token', (res as any).access_token)
    //   authService.saveToken((res as any).access_token)
    // }

    user.value = (res as any).user || null
    if ((res as any).user) {
      localStorage.setItem('user', JSON.stringify((res as any).user))
    }

    return res
  } catch (e: unknown) {
    const err = e as any
    error.value = err?.response?.data?.message || 'Credenciales incorrectas'
    throw e
  } finally {
    loading.value = false
  }
}

async function register(userData: RegisterRequest) {
  loading.value = true
  error.value = null
  try {
    const res = await authService.register(userData)
    authService.saveToken(res.token)
    user.value = res.user
    if (res.user) {
      localStorage.setItem('user', JSON.stringify(res.user))
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al registrarse'
    throw e
  } finally {
    loading.value = false
  }
}

async function logout() {
  loading.value = true
  error.value = null
  try {
    await authService.logout()
  } catch (e) {
    // even if logout fails, clear local state and token
    error.value = e instanceof Error ? e.message : 'Error al cerrar sesión'
  } finally {
    authService.removeToken()
    user.value = null
    localStorage.removeItem('user')
    loading.value = false
  }
}

async function checkAuth() {
  loading.value = true
  error.value = null
  try {
    const token = authService.getToken()
    if (!token) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        user.value = JSON.parse(storedUser) as User
      } else {
        user.value = null
      }
      return
    }
    const me = await authService.getCurrentUser()
    user.value = me
    if (me) {
      localStorage.setItem('user', JSON.stringify(me))
    }
  } catch (e) {
    // If token invalid or failed, ensure clean state
    authService.removeToken()
    user.value = null
    error.value = e instanceof Error ? e.message : 'No autenticado'
  } finally {
    loading.value = false
  }
}

function clearError() {
  error.value = null
}

export function useAuth() {
  return {
    // state
    user,
    isAuthenticated,
    loading,
    error,
    // methods
    login,
    register,
    logout,
    checkAuth,
    clearError,
  }
}
