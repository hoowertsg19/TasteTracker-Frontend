<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated, user, logout, loading } = useAuth()
const username = computed(() => user.value?.name ?? '')

async function onLogout() {
  await logout()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-4">
            <RouterLink to="/" class="text-lg font-semibold">TasteTracker</RouterLink>
            <div v-if="isAuthenticated" class="hidden sm:flex items-center gap-3">
              <RouterLink to="/dashboard" class="hover:underline">Dashboard</RouterLink>
              <RouterLink to="/menu" class="hover:underline">Menú</RouterLink>
              <RouterLink to="/pedidos" class="hover:underline">Pedidos</RouterLink>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <template v-if="isAuthenticated">
              <span class="text-sm text-gray-600 hidden sm:inline">{{ username }}</span>
              <button
                class="inline-flex justify-center items-center rounded-md bg-gray-800 px-3 py-1.5 text-white hover:bg-gray-900 disabled:opacity-50"
                :disabled="loading"
                @click="onLogout"
              >
                Cerrar sesión
              </button>
            </template>
            <template v-else>
              <RouterLink to="/login" class="hover:underline">Login</RouterLink>
              <RouterLink to="/register" class="hover:underline">Registro</RouterLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto p-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
