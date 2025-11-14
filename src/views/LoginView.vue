<template>
  <!-- Container principal - 100vh completo -->
  <div class="min-h-screen flex overflow-hidden">
    <!-- ========== COLUMNA IZQUIERDA - HERO ========== -->
    <div class="hidden lg:flex lg:w-[45%] relative overflow-hidden">
      <!-- Imagen de fondo con zoom hover -->
      <div
        class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[20s] ease-out hover:scale-110"
        style="
          background-image: url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80');
          transform-origin: center center;
        "
      >
        <!-- Overlay oscuro - DENTRO del div de imagen para que escale junto -->
        <div
          class="absolute inset-0 bg-linear-to-br from-gray-900/90 via-orange-900/60 to-gray-900/85"
        ></div>

        <!-- Pattern overlay decorativo -->
        <div
          class="absolute inset-0 opacity-10"
          style="
            background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);
          "
        ></div>
      </div>

      <!-- Contenido con spacing mejorado: header, contenido central, footer -->
      <div class="relative z-10 flex flex-col justify-between h-full px-12 py-12">
        <!-- Header superior -->
        <div class="animate-fade-in-up">
          <div
            class="inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-default group"
          >
            <img
              src="/logo.png"
              alt="TasteTracker Logo"
              class="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span class="text-2xl font-bold text-white">TasteTracker</span>
          </div>
        </div>

        <!-- Contenido central -->
        <div class="mt-16 space-y-6">
          <div class="space-y-4">
            <h1 class="text-4xl font-extrabold tracking-tight text-white">
              Gestión inteligente de tu restaurante
            </h1>
            <p class="text-gray-200 text-sm max-w-md">
              Controla pedidos, mesas, menú y clientes en una sola plataforma pensada para equipos
              que no tienen tiempo que perder.
            </p>
          </div>

          <div class="space-y-4">
            <div
              class="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
            >
              <div
                class="shrink-0 w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-xl group-hover:scale-110 transition-transform"
              >
                ⚡
              </div>
              <div>
                <h3 class="text-white font-bold text-base">Gestión Rápida</h3>
                <p class="text-gray-200 text-sm">Procesa pedidos en segundos</p>
              </div>
            </div>

            <div
              class="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
            >
              <div
                class="shrink-0 w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-xl group-hover:scale-110 transition-transform"
              >
                📊
              </div>
              <div>
                <h3 class="text-white font-bold text-base">Control Total</h3>
                <p class="text-gray-200 text-sm">Menú y clientes centralizados</p>
              </div>
            </div>

            <div
              class="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
            >
              <div
                class="shrink-0 w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-xl group-hover:scale-110 transition-transform"
              >
                🔒
              </div>
              <div>
                <h3 class="text-white font-bold text-base">Seguridad Garantizada</h3>
                <p class="text-gray-200 text-sm">Datos protegidos 24/7</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer inferior -->
        <div
          class="flex items-center gap-3 text-gray-300 text-sm animate-fade-in-up"
          style="animation-delay: 0.4s"
        >
          <div class="flex -space-x-2">
            <div
              class="w-9 h-9 rounded-full bg-linear-to-br from-orange-400 to-red-500 border-2 border-gray-900"
            ></div>
            <div
              class="w-9 h-9 rounded-full bg-linear-to-br from-blue-400 to-purple-500 border-2 border-gray-900"
            ></div>
            <div
              class="w-9 h-9 rounded-full bg-linear-to-br from-green-400 to-teal-500 border-2 border-gray-900"
            ></div>
          </div>
          <span>Más de 500+ restaurantes confían en nosotros</span>
        </div>
      </div>
    </div>

    <!-- ========== COLUMNA DERECHA - FORMULARIO ========== -->
    <div
      class="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-12 py-10 sm:py-12"
    >
      <div class="w-full max-w-md">
        <!-- Logo y texto superior en móvil -->
        <div class="lg:hidden mb-8 text-center">
          <div
            class="inline-flex items-center gap-4 bg-linear-to-br from-orange-500 to-red-600 px-10 py-5 rounded-2xl shadow-xl"
          >
            <img src="/logo.png" alt="TasteTracker" class="w-14 h-14 object-contain" />
            <span class="text-3xl font-bold text-white">TasteTracker</span>
          </div>
        </div>
        <div class="bg-white rounded-3xl p-6 sm:p-10 border-2 border-gray-100 shadow-xl">
          <!-- Header simple sin icono -->
          <div class="mb-8">
            <h2
              class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight text-center"
            >
              ¡Bienvenido!
            </h2>
            <p class="text-base text-gray-600 text-center mb-2">
              Ingresa tus credenciales para acceder al sistema
            </p>
            <p class="text-gray-500 text-sm sm:text-base text-center">
              Accede a tu panel para gestionar pedidos, menú y clientes.
            </p>
          </div>
          <!-- Estado de error -->
          <div
            v-if="error"
            class="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-3 animate-fade-in-up"
          >
            <span class="mt-0.5">⚠️</span>
            <div class="flex-1">
              <p class="font-semibold">No se pudo iniciar sesión</p>
              <p class="text-xs mt-0.5">{{ error }}</p>
            </div>
            <button
              type="button"
              class="text-xs font-semibold text-red-600 hover:text-red-700"
              @click="clearError()"
            >
              Cerrar
            </button>
          </div>

          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Email con validación backend -->
            <div class="space-y-2">
              <label
                class="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2"
              >
                <span class="text-orange-500">●</span>
                Correo electrónico
              </label>
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>

                <input
                  v-model="email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  class="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 outline-none text-base"
                  :class="{
                    'border-green-500': emailStatus === 'valid',
                    'border-red-500': emailStatus === 'not-found' || emailStatus === 'invalid',
                    'border-gray-200': emailStatus === 'idle' || emailStatus === 'checking',
                  }"
                />

                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg
                    v-if="emailStatus === 'checking'"
                    class="w-5 h-5 text-orange-500 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>

                  <svg
                    v-else-if="emailStatus === 'valid'"
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <svg
                    v-else-if="emailStatus === 'not-found' || emailStatus === 'invalid'"
                    class="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <p
                v-if="emailMessage"
                class="text-sm mt-1.5"
                :class="{
                  'text-green-600': emailStatus === 'valid',
                  'text-red-600': emailStatus === 'not-found' || emailStatus === 'invalid',
                  'text-orange-600': emailStatus === 'checking',
                }"
              >
                {{ emailMessage }}
              </p>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label
                  class="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  for="password"
                >
                  Contraseña
                </label>
                <label
                  class="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-orange-600 transition-colors"
                  for="showPasswordCheck"
                >
                  <input
                    id="showPasswordCheck"
                    type="checkbox"
                    v-model="showPassword"
                    class="w-3.5 h-3.5 rounded border-2 border-gray-300 text-orange-500 focus:ring-2 focus:ring-orange-500 cursor-pointer"
                    :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                  />
                  <span>Mostrar</span>
                </label>
              </div>

              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  placeholder="••••••••••"
                  class="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 outline-none text-base"
                />
              </div>
            </div>

            <button
              type="submit"
              :disabled="loading || !email || password.length < 6 || emailStatus !== 'valid'"
              @click="createRipple"
              class="relative w-full py-5 px-6 bg-linear-to-r from-orange-500 via-orange-600 to-red-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-600/40 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-300 overflow-hidden group"
            >
              <span
                v-for="ripple in ripples"
                :key="ripple.id"
                class="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
                :style="{
                  left: ripple.x + 'px',
                  top: ripple.y + 'px',
                  width: ripple.size + 'px',
                  height: ripple.size + 'px',
                }"
              ></span>

              <div
                class="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              ></div>

              <span v-if="!loading" class="relative z-10">Iniciar sesión</span>
              <span v-else class="relative z-10 flex items-center gap-2">
                <svg
                  class="w-4 h-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Iniciando sesión...
              </span>
              <span
                class="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.2),transparent_55%)] opacity-0 hover:opacity-100 transition-opacity duration-300"
              ></span>
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-10">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t-2 border-gray-200"></div>
            </div>
            <div class="relative flex justify-center">
              <span
                class="px-6 bg-white text-sm font-semibold text-gray-500 uppercase tracking-wide"
              >
                ¿Nuevo en TasteTracker?
              </span>
            </div>
          </div>

          <!-- Link a registro -->
          <router-link
            to="/register"
            class="block w-full py-4 px-6 border-2 border-gray-200 text-gray-700 font-bold text-center rounded-xl hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 group"
          >
            <span class="flex items-center justify-center gap-2">
              Crear cuenta nueva
              <svg
                class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useEmailValidation } from '@/composables/useEmailValidation'

const router = useRouter()
const route = useRoute()
const { login, loading, error, clearError } = useAuth()
const { email, emailStatus, emailMessage } = useEmailValidation()

const password = ref('')
const showPassword = ref(false)

const handleSubmit = async () => {
  if (loading.value || emailStatus.value !== 'valid') return

  clearError()
  await login({ email: email.value, password: password.value })

  if (!error.value) {
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.push(redirect)
  }
}

const ripples = ref<Array<{ id: number; x: number; y: number; size: number }>>([])

const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLButtonElement
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height) * 2
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  const id = Date.now()
  ripples.value.push({ id, x, y, size })

  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id)
  }, 600)
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out both;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 0.6s ease-out;
}
</style>
