<template>
  <div class="min-h-screen flex overflow-hidden">
    <!-- ========== COLUMNA IZQUIERDA - HERO (COPIAR DE FORGOT PASSWORD) ========== -->
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
                Nueva
                <span
                  class="block text-transparent bg-clip-text bg-linear-to-r from-orange-300 via-orange-400 to-red-400"
                >
                  Contraseña
                </span>
              </h1>
              <div
                class="h-1.5 w-32 bg-linear-to-r from-orange-400 via-red-500 to-orange-400 rounded-full"
              ></div>
            </div>

            <p class="text-xl text-gray-100 leading-relaxed font-light">
              Crea una contraseña segura para mantener tu cuenta protegida.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-3 animate-fade-in-up" style="animation-delay: 0.3s">
            <div
              class="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10"
            >
              <div
                class="shrink-0 w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-xl shadow-xl"
              >
                ✅
              </div>
              <div>
                <h3 class="text-white font-bold text-base">Recupera el acceso</h3>
                <p class="text-gray-200 text-sm">Completa el formulario y vuelve a entrar</p>
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
                Nueva contraseña
              </h2>
              <p class="text-lg text-gray-600">
                Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta
              </p>
            </div>

            <!-- Success message -->
            <div
              v-if="passwordChanged"
              class="mb-8 p-5 bg-linear-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl"
            >
              <div class="flex items-start gap-4">
                <div
                  class="shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold"
                >
                  ✓
                </div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-green-900 mb-1">¡Contraseña actualizada!</p>
                  <p class="text-sm text-green-700 mb-3">
                    Tu contraseña ha sido restablecida exitosamente.
                  </p>
                  <router-link
                    to="/login"
                    class="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800 underline"
                  >
                    Ir al inicio de sesión
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </router-link>
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
            <form v-if="!passwordChanged" @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Nueva contraseña -->
              <div class="space-y-2">
                <label
                  class="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2"
                >
                  <span class="text-orange-500">●</span>
                  Nueva contraseña
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    placeholder="Mínimo 8 caracteres"
                    class="w-full pl-12 pr-14 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 outline-none text-base"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    <svg
                      v-if="!showPassword"
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </button>
                </div>

                <!-- Indicador de fuerza -->
                <div v-if="password" class="mt-3">
                  <div class="flex gap-1.5">
                    <div
                      class="h-2 flex-1 rounded-full transition-all duration-300"
                      :class="passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-200'"
                    ></div>
                    <div
                      class="h-2 flex-1 rounded-full transition-all duration-300"
                      :class="passwordStrength >= 2 ? 'bg-orange-500' : 'bg-gray-200'"
                    ></div>
                    <div
                      class="h-2 flex-1 rounded-full transition-all duration-300"
                      :class="passwordStrength >= 3 ? 'bg-yellow-500' : 'bg-gray-200'"
                    ></div>
                    <div
                      class="h-2 flex-1 rounded-full transition-all duration-300"
                      :class="passwordStrength >= 4 ? 'bg-green-500' : 'bg-gray-200'"
                    ></div>
                  </div>
                  <p
                    class="text-xs mt-2 font-medium"
                    :class="{
                      'text-red-600': passwordStrength <= 1,
                      'text-orange-600': passwordStrength === 2,
                      'text-yellow-600': passwordStrength === 3,
                      'text-green-600': passwordStrength >= 4,
                    }"
                  >
                    {{ passwordStrengthText }}
                  </p>
                </div>
              </div>

              <!-- Confirmar contraseña -->
              <div class="space-y-2">
                <label
                  class="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2"
                >
                  <span class="text-orange-500">●</span>
                  Confirmar contraseña
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    required
                    placeholder="Confirma tu contraseña"
                    class="w-full pl-12 pr-14 py-4 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 outline-none text-base"
                    :class="{
                      'border-green-500': passwordsMatch && confirmPassword,
                      'border-red-500': !passwordsMatch && confirmPassword,
                      'border-gray-200': !confirmPassword,
                    }"
                  />

                  <div class="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
                    <svg
                      v-if="passwordsMatch && confirmPassword"
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
                      v-else-if="!passwordsMatch && confirmPassword"
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
                    <button
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      <svg
                        v-if="!showConfirmPassword"
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <svg
                        v-else
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <p v-if="!passwordsMatch && confirmPassword" class="text-sm text-red-600 mt-1.5">
                  Las contraseñas no coinciden
                </p>
              </div>

              <!-- Botón submit -->
              <button
                type="submit"
                :disabled="loading || !passwordsMatch || passwordStrength < 2"
                class="relative w-full py-5 px-6 bg-linear-to-r from-orange-500 via-orange-600 to-red-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-600/40 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-300 overflow-hidden group"
              >
                <div
                  class="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                ></div>

                <span v-if="!loading" class="relative flex items-center justify-center gap-3">
                  Restablecer contraseña
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
                  Actualizando...
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

      <!-- Footer -->
      <footer class="w-full px-4 sm:px-8 lg:px-12 pb-6 pt-6 text-xs text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} TasteTracker. Todos los derechos reservados.</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authAPI } from '@/services/api'

const route = useRoute()
const router = useRouter()

const token = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)
const passwordChanged = ref(false)

onMounted(() => {
  token.value = (route.query.token as string) || ''
  email.value = (route.query.email as string) || ''

  if (!token.value || !email.value) {
    error.value = 'Enlace inválido o expirado'
  }
})

const clearError = () => {
  error.value = null
}

const passwordsMatch = computed(() => {
  if (!confirmPassword.value) return false
  return password.value === confirmPassword.value
})

const passwordStrength = computed(() => {
  const pwd = password.value
  if (!pwd) return 0

  let strength = 0
  if (pwd.length >= 8) strength++
  if (pwd.length >= 12) strength++
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
  if (/[0-9]/.test(pwd)) strength++
  if (/[^a-zA-Z0-9]/.test(pwd)) strength++

  return Math.min(strength, 4)
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return ''
  if (strength === 1) return 'Contraseña muy débil'
  if (strength === 2) return 'Contraseña aceptable'
  if (strength === 3) return 'Contraseña buena'
  return 'Contraseña fuerte'
})

const handleSubmit = async () => {
  if (!passwordsMatch.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  if (passwordStrength.value < 2) {
    error.value = 'La contraseña es demasiado débil'
    return
  }

  if (!token.value || !email.value) {
    error.value = 'Enlace inválido o expirado'
    return
  }

  loading.value = true
  error.value = null

  try {
    await authAPI.resetPassword({
      token: token.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    })
    passwordChanged.value = true

    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al restablecer la contraseña'
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
