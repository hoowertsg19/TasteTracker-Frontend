export interface Cliente {
  id_cliente: number
  nombre_cliente: string
  telefono: string
  direccion?: string
  created_at?: string
  updated_at?: string
}

export interface CreateClienteRequest {
  nombre_cliente: string
  telefono: string
  direccion?: string
}

export interface UpdateClienteRequest {
  nombre_cliente?: string
  telefono?: string
  direccion?: string
}
