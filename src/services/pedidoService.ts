import httpClient from '@/services/httpClient'
import axios from 'axios'
import type { Pedido, CreatePedidoRequest } from '@/types/pedido'

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

export async function listPedidos(): Promise<Pedido[]> {
  try {
    const { data } = await httpClient.get<Pedido[]>('/v1/pedidos')
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function getPedido(id: number): Promise<Pedido> {
  try {
    const { data } = await httpClient.get<Pedido>(`/v1/pedidos/${id}`)
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}

export async function createPedido(payload: CreatePedidoRequest): Promise<Pedido> {
  try {
    const { data } = await httpClient.post<Pedido>('/v1/pedidos', payload)
    return data
  } catch (error) {
    throw new Error(parseAxiosError(error))
  }
}
