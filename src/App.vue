<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Modo oscuro global basado solo en tt_theme
const isDark = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('tt_theme')
  isDark.value = stored === 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
})

// Manejo de sesión (login/logout) ahora vive en las vistas específicas
</script>

<style>
#app {
  min-height: 100vh;
  min-height: 100dvh; /* Para móviles modernos */
}
</style>
