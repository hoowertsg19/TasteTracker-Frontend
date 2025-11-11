export interface Empleado {
  id_empleado: number
  nombre_completo: string
  rol: 'mesero' | 'cocinero' | 'cajero'
  activo: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateEmpleadoRequest {
  nombre_completo: string
  rol: 'mesero' | 'cocinero' | 'cajero'
  activo: boolean
}

export interface UpdateEmpleadoRequest {
  nombre_completo?: string
  rol?: 'mesero' | 'cocinero' | 'cajero'
  activo?: boolean
}
