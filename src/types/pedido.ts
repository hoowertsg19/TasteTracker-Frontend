import type { MenuItem } from './menu'
import type { Cliente } from './cliente'
import type { Empleado } from './empleado'

export interface Pedido {
  id_pedido: number
  id_empleado: number
  id_cliente: number
  numero_mesa: string
  fecha_creacion: string
  estado: string
  total: number
  empleado?: Empleado
  cliente?: Cliente
  detalles?: DetallePedido[]
}

export interface DetallePedido {
  id_detalle: number
  id_pedido: number
  id_menu: number
  cantidad: number
  precio_unitario: number
  subtotal: number
  menu?: MenuItem
}

export interface CreatePedidoRequest {
  id_empleado: number
  id_cliente: number
  numero_mesa: string
  detalles: {
    id_menu: number
    cantidad: number
    precio_unitario: number
  }[]
}
