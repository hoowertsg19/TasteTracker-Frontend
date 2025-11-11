import httpClient from '@/services/httpClient'
import axios from 'axios'
import type { Empleado, CreateEmpleadoRequest, UpdateEmpleadoRequest } from '@/types/empleado'

function parseAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const data = error.response?.data as { message?: string } | undefined
    const serverMessage = typeof data?.message === 'string' ? data.message : undefined
    if (serverMessage) return serverMessage
    if (status === 0 || !error.response) return 'Error de red. Verifica tu conexión.'
    return `Error HTTP ${status ?? ''}`.trim()
  }
  if (error instanceof Error) return error.message
  return 'Ocurrió un error inesperado.'
}

export async function listEmpleados(): Promise<Empleado[]> {
  try {
    const { data } = await httpClient.get<Empleado[]>('/v1/empleados')
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function getEmpleado(id: number): Promise<Empleado> {
  try {
    const { data } = await httpClient.get<Empleado>(`/v1/empleados/${id}`)
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function createEmpleado(payload: CreateEmpleadoRequest): Promise<Empleado> {
  try {
    const { data } = await httpClient.post<Empleado>('/v1/empleados', payload)
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function updateEmpleado(
  id: number,
  payload: UpdateEmpleadoRequest,
): Promise<Empleado> {
  try {
    const { data } = await httpClient.put<Empleado>(`/v1/empleados/${id}`, payload)
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function deleteEmpleado(id: number): Promise<void> {
  try {
    await httpClient.delete(`/v1/empleados/${id}`)
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}
