import httpClient from '@/services/httpClient'
import axios from 'axios'
import type { MenuItem, CreateMenuItemRequest, UpdateMenuItemRequest } from '@/types/menu'

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

export async function listMenu(): Promise<MenuItem[]> {
  try {
    const { data } = await httpClient.get<MenuItem[]>('/v1/menu')
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function getMenu(id: number): Promise<MenuItem> {
  try {
    const { data } = await httpClient.get<MenuItem>(`/v1/menu/${id}`)
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function createMenu(payload: CreateMenuItemRequest): Promise<MenuItem> {
  try {
    const { data } = await httpClient.post<MenuItem>('/v1/menu', payload)
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function updateMenu(id: number, payload: UpdateMenuItemRequest): Promise<MenuItem> {
  try {
    const { data } = await httpClient.put<MenuItem>(`/v1/menu/${id}`, payload)
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function deleteMenu(id: number): Promise<void> {
  try {
    await httpClient.delete(`/v1/menu/${id}`)
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}
