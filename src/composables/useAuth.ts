import { ref, computed } from 'vue'
import * as authService from '@/services/authService'
import type { LoginRequest, RegisterRequest, User } from '@/types/auth'

const user = ref<User | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const isAuthenticated = computed(() => user.value !== null)

async function login(credentials: LoginRequest) {
  loading.value = true
  error.value = null
  try {
    const res = await authService.login(credentials)
    authService.saveToken(res.token)
    user.value = res.user
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al iniciar sesión'
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
    loading.value = false
  }
}

async function checkAuth() {
  loading.value = true
  error.value = null
  try {
    const token = authService.getToken()
    if (!token) {
      user.value = null
      return
    }
    const me = await authService.getCurrentUser()
    user.value = me
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
