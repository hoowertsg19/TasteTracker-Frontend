import type { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types/auth'
import axios from 'axios'
import { authAPI } from '@/services/api'

const TOKEN_KEY = 'auth_token'

function parseAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const data = error.response?.data as { message?: string } | undefined
    const serverMessage = typeof data?.message === 'string' ? data.message : undefined
    if (serverMessage && typeof serverMessage === 'string') return serverMessage
    if (status === 0 || !error.response) return 'Error de red. Verifica tu conexión.'
    return `Error HTTP ${status ?? ''}`.trim()
  }
  if (error instanceof Error) return error.message
  return 'Ocurrió un error inesperado.'
}

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  try {
    const data = await authAPI.login(credentials)
    return data as AuthResponse
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function register(userData: RegisterRequest): Promise<AuthResponse> {
  try {
    const data = await authAPI.register({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    })
    return data as AuthResponse
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function logout(): Promise<void> {
  try {
    // Delegar en authAPI que ya usa baseURL con /api/v1
    await authAPI.logout()
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function getCurrentUser(): Promise<User> {
  try {
    const data = await authAPI.me()
    return data as User
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}
