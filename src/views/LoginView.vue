<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const route = useRoute()
const { login, loading, error, clearError } = useAuth()

const email = ref('')
const password = ref('')

async function onSubmit() {
  clearError()
  try {
    await login({ email: email.value, password: password.value })
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.push(redirect)
  } catch {
    // error is handled in composable; keep UI responsive
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md bg-white shadow rounded-lg p-6">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Iniciar sesión</h1>

      <form class="space-y-4" @submit.prevent="onSubmit">
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

        <button
          type="submit"
          :disabled="loading"
          class="w-full inline-flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          <span v-if="!loading">Entrar</span>
          <span v-else>Entrando...</span>
        </button>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <p class="text-sm text-gray-600 text-center">
          ¿No tienes cuenta?
          <RouterLink to="/register" class="text-indigo-600 hover:underline">Regístrate</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
