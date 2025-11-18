<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <nav
      class="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-sm dark:bg-gray-900 dark:border-gray-800"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="TasteTracker" class="w-10 h-10" />
            <span
              class="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
            >
              TasteTracker
            </span>
          </div>

          <div class="flex items-center gap-4">
            <!-- Modo oscuro / claro -->
            <button
              type="button"
              class="relative inline-flex h-7 w-12 items-center rounded-full border border-gray-300 bg-gray-100 px-1 text-xs font-semibold transition-all duration-200 dark:bg-gray-800 dark:border-gray-600"
              @click="toggleDarkMode"
            >
              <span
                class="absolute inset-0 flex items-center justify-between px-1 text-[10px] text-gray-500 dark:text-gray-300"
              >
                <span>☀️</span>
                <span>🌙</span>
              </span>
              <span
                class="inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 dark:bg-gray-200"
                :class="isDark ? 'translate-x-5' : 'translate-x-0'"
              ></span>
            </button>

            <button
              @click="refresh"
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Refrescar datos"
            >
              <svg
                class="w-5 h-5 text-gray-600"
                :class="{ 'animate-spin': loading }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

            <div class="flex items-center gap-3">
              <div class="text-right">
                <p class="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {{ displayName || 'Cargando...' }}
                </p>
                <p class="text-xs text-gray-600 dark:text-gray-400">Administrador</p>
              </div>
              <div
                class="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold"
              >
                {{ displayInitial }}
              </div>
            </div>

            <button
              @click="handleLogout"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-4xl font-black text-gray-900 dark:text-white mb-2">
          ¡Hola, {{ displayName }}! 👋
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Aquí está tu resumen de hoy -
          {{
            new Date().toLocaleDateString('es-MX', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </p>
      </div>

      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"
          ></div>
          <p class="text-gray-600 dark:text-gray-300 font-medium">Cargando dashboard...</p>
        </div>
      </div>

      <div v-else-if="error" class="bg-red-50 border-2 border-red-500 rounded-xl p-6 text-center">
        <p class="text-red-700 font-semibold">{{ error }}</p>
        <button
          @click="refresh"
          class="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
        >
          Reintentar
        </button>
      </div>

      <div v-else class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Pedidos Hoy"
            :value="stats?.pedidos_hoy?.total || 0"
            icon="📋"
            iconBgClass="bg-gradient-to-br from-blue-400 to-blue-600 text-white"
            :cambio="stats?.pedidos_hoy?.cambio ?? null"
            :tendencia="stats?.pedidos_hoy?.tendencia"
            description="vs ayer"
          />

          <StatsCard
            title="Ventas Hoy"
            :value="stats?.ventas_hoy?.total || 0"
            icon="💰"
            iconBgClass="bg-gradient-to-br from-green-400 to-green-600 text-white"
            prefix="$"
            :cambio="stats?.ventas_hoy?.cambio ?? null"
            :tendencia="stats?.ventas_hoy?.tendencia"
            description="vs ayer"
          />

          <StatsCard
            title="Clientes"
            :value="stats?.clientes_activos || 0"
            icon="👥"
            iconBgClass="bg-gradient-to-br from-purple-400 to-purple-600 text-white"
            description="registrados"
          />

          <StatsCard
            title="Productos"
            :value="stats?.productos_menu || 0"
            icon="🍕"
            iconBgClass="bg-gradient-to-br from-orange-400 to-red-500 text-white"
            description="en menú"
          />
        </div>

        <SalesChart :data="ventasChart" @change-period="cambiarPeriodo" />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <RecentOrders :pedidos="pedidosRecientes" />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useDashboard } from '@/composables/useDashboard'
import StatsCard from '@/components/dashboard/StatsCard.vue'
import SalesChart from '@/components/dashboard/SalesChart.vue'
import RecentOrders from '@/components/dashboard/RecentOrders.vue'
import QuickActions from '@/components/dashboard/QuickActions.vue'

const router = useRouter()
const { user, logout, loading, checkAuth } = useAuth()
const { stats, ventasChart, pedidosRecientes, error, refresh, fetchVentasChart } = useDashboard()

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

const cambiarPeriodo = (dias: number) => {
  fetchVentasChart(dias)
}

// Tema oscuro / claro (usa solo tt_theme para no pelearse con App.vue)
const isDark = ref(false)

const syncThemeFromStorage = () => {
  if (typeof window === 'undefined') return
  const stored = localStorage.getItem('tt_theme')
  const nextIsDark = stored === 'dark'
  isDark.value = nextIsDark
  document.documentElement.classList.toggle('dark', nextIsDark)
}

const toggleDarkMode = () => {
  if (typeof window === 'undefined') return
  const nextIsDark = !isDark.value
  isDark.value = nextIsDark
  localStorage.setItem('tt_theme', nextIsDark ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', nextIsDark)
}

onMounted(() => {
  checkAuth()
  syncThemeFromStorage()
})

// Nombre e inicial de usuario
const displayName = computed(() => {
  const name = user.value?.name?.trim()
  return name && name.length > 0 ? name : ''
})

const displayInitial = computed(() => {
  const name = user.value?.name?.trim()
  return name && name.length > 0 ? name.charAt(0).toUpperCase() : ''
})
</script>
