<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MenuItem, CreateMenuItemRequest } from '@/types/menu'
import { listMenu, createMenu, deleteMenu } from '@/services/menuService'

const items = ref<MenuItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const form = ref<CreateMenuItemRequest>({
  nombre: '',
  precio: 0,
  categoria: 'comidas',
  disponible: true,
})

async function fetchItems() {
  loading.value = true
  error.value = null
  try {
    items.value = await listMenu()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al cargar el menú'
  } finally {
    loading.value = false
  }
}

async function onCreate() {
  loading.value = true
  error.value = null
  try {
    const payload: CreateMenuItemRequest = {
      ...form.value,
      precio: Number(form.value.precio),
    }
    await createMenu(payload)
    // Refrescar desde el backend para asegurar estructura consistente (evita items sin id)
    await fetchItems()
    form.value = {
      nombre: '',
      precio: 0,
      categoria: 'comidas',
      disponible: true,
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al crear ítem'
  } finally {
    loading.value = false
  }
}

async function onDelete(id: number) {
  // Validar id para evitar llamadas /undefined
  const numericId = Number(id)
  if (!numericId || Number.isNaN(numericId)) {
    error.value = 'ID de ítem inválido.'
    return
  }
  if (!confirm('¿Eliminar este ítem del menú?')) return
  loading.value = true
  error.value = null
  try {
    await deleteMenu(numericId)
    items.value = items.value.filter((i) => i.id_menu !== numericId)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al eliminar ítem'
  } finally {
    loading.value = false
  }
}

onMounted(fetchItems)
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Menú</h1>

    <div class="bg-white shadow rounded-lg p-4 mb-6">
      <h2 class="text-lg font-semibold mb-3">Agregar ítem</h2>
      <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="onCreate">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre del platillo</label>
          <input
            v-model="form.nombre"
            type="text"
            required
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            v-model="form.categoria"
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="bebidas">Bebidas</option>
            <option value="comidas">Comidas</option>
            <option value="postres">Postres</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Precio</label>
          <input
            v-model.number="form.precio"
            type="number"
            min="0"
            step="0.01"
            required
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Disponible</label>
          <select
            v-model="form.disponible"
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option :value="true">Sí</option>
            <option :value="false">No</option>
          </select>
        </div>

        <div class="md:col-span-2 flex justify-end">
          <button
            :disabled="loading"
            class="inline-flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Agregar
          </button>
        </div>
      </form>
      <p v-if="error" class="text-sm text-red-600 mt-2">{{ error }}</p>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Categoría
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Precio
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Disponible
              </th>
              <th class="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="5" class="px-4 py-3 text-center text-gray-500">Cargando...</td>
            </tr>
            <tr v-else-if="items.length === 0">
              <td colspan="5" class="px-4 py-3 text-center text-gray-500">Sin ítems</td>
            </tr>
            <tr v-for="item in items" :key="item.id_menu">
              <td class="px-4 py-2">{{ item.nombre }}</td>
              <td class="px-4 py-2">{{ item.categoria }}</td>
              <td class="px-4 py-2">${{ item.precio.toFixed(2) }}</td>
              <td class="px-4 py-2">
                <span :class="item.disponible ? 'text-green-600' : 'text-red-600'">{{
                  item.disponible ? 'Sí' : 'No'
                }}</span>
              </td>
              <td class="px-4 py-2 text-right">
                <button class="text-red-600 hover:underline" @click="onDelete(item.id_menu)">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
