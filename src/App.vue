<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navbar mejorada - Solo visible si NO estás en login/register -->
    <nav
      v-if="!isAuthPage"
      class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm transition-all duration-300"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo/Brand -->
          <router-link to="/" class="flex items-center gap-3 group">
            <div
              class="w-10 h-10 bg-linear-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
            >
              <span class="text-2xl">🍽️</span>
            </div>
            <span class="text-xl font-bold text-gray-900 hidden sm:block"> TasteTracker </span>
          </router-link>

          <!-- Navigation Links -->
          <div class="flex items-center gap-4">
            <router-link
              v-if="!isAuthenticated"
              to="/login"
              class="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              Iniciar sesión
            </router-link>
            <router-link
              v-if="!isAuthenticated"
              to="/register"
              class="px-6 py-2 text-sm font-bold text-white bg-linear-to-r from-orange-500 to-red-600 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Registrarse
            </router-link>

            <!-- Si está autenticado -->
            <div v-if="isAuthenticated" class="flex items-center gap-4">
              <router-link
                to="/dashboard"
                class="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors"
              >
                Dashboard
              </router-link>
              <button
                class="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                @click="handleLogout"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content - AJUSTADO para no tener espacios -->
    <main :class="isAuthPage ? '' : 'pt-16'">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { isAuthenticated, logout } = useAuth()

// Detectar si estamos en página de auth (login/register)
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/register'
})

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

<style>
#app {
  min-height: 100vh;
  min-height: 100dvh; /* Para móviles modernos */
}
</style>
