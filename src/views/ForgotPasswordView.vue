<template>
  <div class="min-h-screen flex overflow-hidden">
    <!-- ========== COLUMNA IZQUIERDA - HERO (COPIAR DE LOGIN) ========== -->
    <div class="hidden lg:flex lg:w-[45%] relative overflow-hidden">
      <div
        class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[20s] ease-out hover:scale-110"
        style="
          background-image: url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80');
          transform-origin: center center;
        "
      >
        <div
          class="absolute inset-0 bg-linear-to-br from-gray-900/90 via-orange-900/60 to-gray-900/85"
        ></div>
        <div
          class="absolute inset-0 opacity-10"
          style="
            background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);
          "
        ></div>
      </div>

      <div class="relative z-10 flex flex-col justify-between h-full px-12 py-12">
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

        <div class="space-y-8 max-w-lg">
          <div class="space-y-6 animate-fade-in-up" style="animation-delay: 0.15s">
            <div class="space-y-4">
              <h1 class="text-5xl sm:text-6xl font-black text-white leading-tight tracking-tight">
                Recupera tu<br />
                <span
                  class="text-transparent bg-clip-text bg-linear-to-r from-orange-300 via-orange-400 to-red-400"
                >
                  Acceso
                </span>
              </h1>
              <div
                class="h-1.5 w-32 bg-linear-to-r from-orange-400 via-red-500 to-orange-400 rounded-full"
              ></div>
            </div>

            <p class="text-xl text-gray-100 leading-relaxed font-light">
              Te enviaremos un enlace seguro para restablecer tu contraseña
            </p>
          </div>

          <div class="grid grid-cols-1 gap-3 animate-fade-in-up" style="animation-delay: 0.3s">
            <div
              class="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10"
            >
              <div
                class="shrink-0 w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-xl"
              >
                🔒
              </div>
              <div>
                <h3 class="text-white font-bold text-base">Proceso Seguro</h3>
                <p class="text-gray-200 text-sm">Enlace válido por 1 hora</p>
              </div>
            </div>
          </div>
        </div>

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
          <span class="font-medium">Más de 500+ restaurantes confían en nosotros</span>
        </div>
      </div>
    </div>

    <!-- ========== COLUMNA DERECHA - FORMULARIO ========== -->
    <div class="w-full lg:w-[55%] flex flex-col min-h-screen bg-white">
      <div class="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div class="w-full max-w-xl animate-fade-in-up" style="animation-delay: 0.4s">
          <!-- Logo mobile -->
          <div class="lg:hidden mb-8 text-center">
            <div
              class="inline-flex items-center gap-4 bg-linear-to-br from-orange-500 to-red-600 px-10 py-5 rounded-2xl shadow-xl"
            >
              <img src="/logo.png" alt="TasteTracker" class="w-14 h-14 object-contain" />
              <span class="text-3xl font-bold text-white">TasteTracker</span>
            </div>
          </div>

          <!-- Card principal -->
          <div class="bg-white rounded-3xl p-6 sm:p-10 border-2 border-gray-100 shadow-xl">
            <!-- Header -->
            <div class="mb-10">
              <h2
                class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight"
              >
                ¿Olvidaste tu contraseña?
              </h2>
              <p class="text-lg text-gray-600">
                Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
              </p>
            </div>

            <!-- Success message -->
            <div
              v-if="emailSent"
              class="mb-8 p-5 bg-linear-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl"
            >
              <div class="flex items-start gap-4">
                <div
                  class="shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold"
                >
                  ✓
                </div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-green-900 mb-1">¡Email enviado!</p>
                  <p class="text-sm text-green-700">
                    Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu
                    contraseña.
                  </p>
                </div>
              </div>
            </div>

            <!-- Error banner -->
            <div
              v-if="error"
              class="mb-8 p-5 bg-linear-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-xl animate-shake"
            >
              <div class="flex items-start gap-4">
                <div
                  class="shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold"
                >
                  !
                </div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-red-900 mb-1">Error</p>
                  <p class="text-sm text-red-700">{{ error }}</p>
                </div>
                <button
                  @click="clearError"
                  class="text-red-500 hover:text-red-700 font-bold text-xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            <!-- Formulario -->
            <form v-if="!emailSent" @submit.prevent="handleSubmit" class="space-y-7">
              <!-- Email -->
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
                    class="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 outline-none text-base"
                  />
                </div>
              </div>

              <!-- Botón submit -->
              <button
                type="submit"
                :disabled="loading || !email"
                class="relative w-full py-5 px-6 bg-linear-to-r from-orange-500 via-orange-600 to-red-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-600/40 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-300 overflow-hidden group"
              >
                <div
                  class="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                ></div>

                <span v-if="!loading" class="relative flex items-center justify-center gap-3">
                  Enviar enlace de recuperación
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
                <span v-else class="relative flex items-center justify-center gap-3">
                  <svg
                    class="animate-spin h-5 w-5"
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
                  Enviando...
                </span>
              </button>
            </form>

            <!-- Link back to login -->
            <div class="mt-8">
              <router-link
                to="/login"
                class="flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:text-orange-600 transition-colors group"
              >
                <svg
                  class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Volver al inicio de sesión
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer (simple placeholder, opcional copiar de LoginView) -->
      <footer class="w-full px-4 sm:px-8 lg:px-12 pb-6 pt-6 text-xs text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} TasteTracker. Todos los derechos reservados.</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authAPI } from '@/services/api'

const email = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const emailSent = ref(false)

const clearError = () => {
  error.value = null
}

const handleSubmit = async () => {
  loading.value = true
  error.value = null

  try {
    await authAPI.forgotPassword(email.value)
    emailSent.value = true
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al enviar el enlace de recuperación'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-8px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(8px);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>
