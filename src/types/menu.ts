export interface MenuItem {
  id_menu: number
  nombre: string
  precio: number
  categoria: 'bebidas' | 'comidas' | 'postres'
  disponible: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateMenuItemRequest {
  nombre: string
  precio: number
  categoria: 'bebidas' | 'comidas' | 'postres'
  disponible: boolean
}

export interface UpdateMenuItemRequest {
  nombre?: string
  precio?: number
  categoria?: 'bebidas' | 'comidas' | 'postres'
  disponible?: boolean
}
