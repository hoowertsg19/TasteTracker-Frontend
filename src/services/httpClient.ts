import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'

const httpClient: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
})

// Request interceptor: attach Bearer token if present
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      // Build headers object in a type-safe way
      const headers = (config.headers ?? {}) as Record<string, string>
      headers['Authorization'] = `Bearer ${token}`
      config.headers = headers as unknown as InternalAxiosRequestConfig['headers']
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

// Response interceptor: handle 401 and network errors
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        try {
          localStorage.removeItem('auth_token')
        } catch {
          // ignore storage errors
        }
        // redirect to login
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
    } else if (error.request) {
      // Network error (no response)
      // You can customize a standard error shape here if needed
    }

    return Promise.reject(error)
  },
)

export default httpClient
