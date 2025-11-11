<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { register, loading, error, clearError } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const formError = ref<string | null>(null)

async function onSubmit() {
  clearError()
  formError.value = null

  if (password.value !== password_confirmation.value) {
    formError.value = 'Las contraseñas no coinciden'
    return
  }

  try {
    await register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    })
    router.push('/dashboard')
  } catch {
    // error handled via composable error state
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md bg-white shadow rounded-lg p-6">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Crear cuenta</h1>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label for="password_confirmation" class="block text-sm font-medium text-gray-700"
            >Confirmar contraseña</label
          >
          <input
            id="password_confirmation"
            v-model="password_confirmation"
            type="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full inline-flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          <span v-if="!loading">Crear cuenta</span>
          <span v-else>Creando...</span>
        </button>

        <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <p class="text-sm text-gray-600 text-center">
          ¿Ya tienes cuenta?
          <RouterLink to="/login" class="text-indigo-600 hover:underline">Inicia sesión</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
