import httpClient from '@/services/httpClient'
import axios from 'axios'
import type { Cliente, CreateClienteRequest, UpdateClienteRequest } from '@/types/cliente'

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

export async function listClientes(): Promise<Cliente[]> {
  try {
    const { data } = await httpClient.get<Cliente[]>('/v1/clientes')
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function getCliente(id: number): Promise<Cliente> {
  try {
    const { data } = await httpClient.get<Cliente>(`/v1/clientes/${id}`)
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function createCliente(payload: CreateClienteRequest): Promise<Cliente> {
  try {
    const { data } = await httpClient.post<Cliente>('/v1/clientes', payload)
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function updateCliente(id: number, payload: UpdateClienteRequest): Promise<Cliente> {
  try {
    const { data } = await httpClient.put<Cliente>(`/v1/clientes/${id}`, payload)
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function deleteCliente(id: number): Promise<void> {
  try {
    await httpClient.delete(`/v1/clientes/${id}`)
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}
