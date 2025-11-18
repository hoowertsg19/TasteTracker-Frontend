<template>
  <div class="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-xl font-bold text-gray-900">Pedidos Recientes</h3>
        <p class="text-sm text-gray-600">Últimos {{ pedidos.length }} pedidos</p>
      </div>
      <router-link
        to="/pedidos"
        class="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
      >
        Ver todos
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>

    <div v-if="pedidos.length > 0" class="space-y-3">
      <div
        v-for="pedido in pedidos"
        :key="pedido.id"
        class="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
        @click="verPedido(pedido.id)"
      >
        <div class="flex items-center gap-4 flex-1">
          <div
            class="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform"
          >
            {{ pedido.numero_pedido?.replace('#', '') || pedido.id }}
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <p class="font-bold text-gray-900">{{ pedido.cliente?.nombre || 'Cliente' }}</p>
              <span
                class="px-2 py-1 rounded-full text-xs font-semibold"
                :class="getEstadoClass(pedido.estado?.color)"
              >
                {{ pedido.estado?.nombre || 'Pendiente' }}
              </span>
            </div>
            <p class="text-sm text-gray-600">
              {{ pedido.items }} item{{ pedido.items !== 1 ? 's' : '' }} -
              {{ pedido.fecha_relativa || '' }}
            </p>
          </div>
        </div>

        <div class="text-right">
          <p class="text-lg font-bold text-gray-900">
            ${{ (pedido.total || 0).toLocaleString('es-MX') }}
          </p>
          <p class="text-xs text-gray-500">{{ pedido.fecha }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <div
        class="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-4xl"
      >
        📦
      </div>
      <p class="text-gray-600 font-medium">No hay pedidos recientes</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  pedidos: any[]
}>()

const router = useRouter()

const verPedido = (id: number) => {
  router.push(`/pedidos/${id}`)
}

const getEstadoClass = (color: string) => {
  const classes: Record<string, string> = {
    yellow: 'bg-yellow-100 text-yellow-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    gray: 'bg-gray-100 text-gray-700',
    red: 'bg-red-100 text-red-700',
  }
  return classes[color] || classes.gray
}
</script>
