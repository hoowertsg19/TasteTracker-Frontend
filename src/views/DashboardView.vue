<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { user, logout, loading } = useAuth()

async function onLogout() {
  await logout()
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Bienvenido, {{ user?.name }}</h1>

    <div class="flex items-center gap-3 mb-6">
      <RouterLink to="/menu" class="text-indigo-600 hover:underline">Menú</RouterLink>
      <RouterLink to="/pedidos" class="text-indigo-600 hover:underline">Pedidos</RouterLink>
      <button
        class="ml-auto inline-flex justify-center items-center rounded-md bg-gray-800 px-3 py-1.5 text-white hover:bg-gray-900 disabled:opacity-50"
        :disabled="loading"
        @click="onLogout"
      >
        Cerrar sesión
      </button>
    </div>

    <p class="text-gray-600">Esta es tu vista de dashboard.</p>
  </div>
</template>
