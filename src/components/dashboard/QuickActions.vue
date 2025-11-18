<template>
  <div class="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
    <h3 class="text-xl font-bold text-gray-900 mb-6">Accesos Rápidos</h3>

    <div class="grid grid-cols-1 gap-3">
      <router-link
        v-for="action in actions"
        :key="action.to"
        :to="action.to"
        class="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group"
      >
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
          :class="action.bgClass"
        >
          {{ action.icon }}
        </div>
        <div class="flex-1">
          <p class="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
            {{ action.title }}
          </p>
          <p class="text-sm text-gray-600">{{ action.description }}</p>
        </div>
        <svg
          class="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const actions = [
  {
    title: 'Nuevo Pedido',
    description: 'Crear un pedido rápido',
    icon: '📝',
    bgClass: 'bg-gradient-to-br from-orange-400 to-red-500',
    to: '/pedidos/nuevo',
  },
  {
    title: 'Ver Menú',
    description: 'Gestionar productos',
    icon: '🍕',
    bgClass: 'bg-gradient-to-br from-blue-400 to-purple-500',
    to: '/menu',
  },
  {
    title: 'Clientes',
    description: 'Administrar clientes',
    icon: '👥',
    bgClass: 'bg-gradient-to-br from-green-400 to-teal-500',
    to: '/clientes',
  },
  {
    title: 'Reportes',
    description: 'Ver estadísticas',
    icon: '📊',
    bgClass: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    to: '/reportes',
  },
]
</script>
