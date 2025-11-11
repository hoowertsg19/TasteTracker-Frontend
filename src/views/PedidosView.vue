<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { listPedidos, createPedido } from '@/services/pedidoService'
import { listMenu } from '@/services/menuService'
import type { Pedido, CreatePedidoRequest } from '@/types/pedido'
import type { MenuItem } from '@/types/menu'

const pedidos = ref<Pedido[]>([])
const menu = ref<MenuItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Form base (sin detalles) y lista de detalles UI con uid para claves únicas
const formBase = ref<{ id_cliente: number; id_empleado: number; numero_mesa: string }>({
  id_cliente: 1,
  id_empleado: 1,
  numero_mesa: '',
})

interface PedidoDetalleUI {
  uid: string
  id_menu: number | null
  cantidad: number
}

const detallesUI = ref<PedidoDetalleUI[]>([])
const formErrors = ref<string[]>([])

const total = computed(() => {
  return detallesUI.value.reduce((sum, d) => {
    const m = menu.value.find((x) => x.id_menu === d.id_menu)
    return sum + (m ? m.precio * d.cantidad : 0)
  }, 0)
})

function addDetalle() {
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const firstMenuId = menu.value[0]?.id_menu ?? null
  detallesUI.value.push({ uid, id_menu: firstMenuId, cantidad: 1 })
}

function removeDetalle(index: number) {
  detallesUI.value.splice(index, 1)
}

async function fetchAll() {
  loading.value = true
  error.value = null
  try {
    const [menus, peds] = await Promise.all([listMenu(), listPedidos()])
    menu.value = menus
    pedidos.value = peds
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al cargar datos'
  } finally {
    loading.value = false
  }
}

function validateForm(): string[] {
  const errs: string[] = []
  const clienteId = Number(formBase.value.id_cliente)
  const empleadoId = Number(formBase.value.id_empleado)
  const mesaStr = String(formBase.value.numero_mesa ?? '')

  if (!clienteId || Number.isNaN(clienteId))
    errs.push('Cliente ID es obligatorio y debe ser válido.')
  if (!empleadoId || Number.isNaN(empleadoId))
    errs.push('Empleado ID es obligatorio y debe ser válido.')
  if (!mesaStr.trim()) errs.push('Número de mesa es obligatorio.')
  if (mesaStr.length > 50) errs.push('Número de mesa no debe exceder 50 caracteres.')
  if (detallesUI.value.length === 0) errs.push('Debe agregar al menos un detalle.')

  detallesUI.value.forEach((d, idx) => {
    if (!d.id_menu) errs.push(`Detalle #${idx + 1}: ítem de menú es obligatorio.`)
    if (!d.cantidad || d.cantidad < 1)
      errs.push(`Detalle #${idx + 1}: la cantidad debe ser mayor a 0.`)
  })

  return errs
}

async function onCreatePedido() {
  loading.value = true
  error.value = null
  formErrors.value = []
  try {
    const errs = validateForm()
    if (errs.length) {
      formErrors.value = errs
      return
    }

    const payload: CreatePedidoRequest = {
      id_cliente: Number(formBase.value.id_cliente),
      id_empleado: Number(formBase.value.id_empleado),
      numero_mesa: String(formBase.value.numero_mesa),
      detalles: detallesUI.value.map((d) => {
        const m = menu.value.find((x) => x.id_menu === d.id_menu)
        return {
          id_menu: Number(d.id_menu),
          cantidad: Number(d.cantidad),
          precio_unitario: Number(m?.precio ?? 0),
        }
      }),
    }

    // Debug
    console.log('Crear pedido payload', payload)

    await createPedido(payload)
    // Refrescar lista tras crear para obtener estructura consistente
    await fetchAll()
    // Reset formulario
    formBase.value = { id_cliente: 1, id_empleado: 1, numero_mesa: '' }
    detallesUI.value = []
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Error al crear pedido'
  } finally {
    loading.value = false
  }
}

onMounted(fetchAll)
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Pedidos</h1>

    <div class="bg-white shadow rounded-lg p-4 mb-6">
      <h2 class="text-lg font-semibold mb-3">Crear pedido</h2>
      <form class="space-y-4" @submit.prevent="onCreatePedido">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Cliente ID</label>
            <input
              v-model.number="formBase.id_cliente"
              type="number"
              min="1"
              required
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Empleado ID</label>
            <input
              v-model.number="formBase.id_empleado"
              type="number"
              min="1"
              required
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Número de mesa</label>
          <input
            v-model="formBase.numero_mesa"
            type="text"
            maxlength="50"
            placeholder="Ej: A12, Terraza, Barra"
            required
            class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-md font-medium">Detalles</h3>
            <button type="button" class="text-indigo-600 hover:underline" @click="addDetalle">
              + Agregar
            </button>
          </div>
          <div v-if="detallesUI.length === 0" class="text-sm text-gray-600">No hay detalles.</div>
          <div
            v-for="(d, index) in detallesUI"
            :key="d.uid"
            class="grid grid-cols-1 md:grid-cols-3 gap-3 items-end mb-2"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700">Ítem</label>
              <select
                v-model.number="d.id_menu"
                class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option v-for="m in menu" :key="m.id_menu" :value="m.id_menu">
                  {{ m.nombre }} - ${{ m.precio.toFixed(2) }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Cantidad</label>
              <input
                v-model.number="d.cantidad"
                type="number"
                min="1"
                class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                class="text-red-600 hover:underline"
                @click="removeDetalle(index)"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-gray-700">
            Total estimado: <span class="font-semibold">${{ total.toFixed(2) }}</span>
          </div>
          <button
            :disabled="loading || detallesUI.length === 0"
            class="inline-flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Crear pedido
          </button>
        </div>
      </form>
      <div v-if="formErrors.length" class="mt-2 text-sm text-red-600 space-y-1">
        <div v-for="(msg, i) in formErrors" :key="i">• {{ msg }}</div>
      </div>
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
                ID
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cliente
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Empleado
              </th>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="4" class="px-4 py-3 text-center text-gray-500">Cargando...</td>
            </tr>
            <tr v-else-if="pedidos.length === 0">
              <td colspan="4" class="px-4 py-3 text-center text-gray-500">Sin pedidos</td>
            </tr>
            <tr v-for="p in pedidos" :key="p.id_pedido">
              <td class="px-4 py-2">#{{ p.id_pedido }}</td>
              <td class="px-4 py-2">{{ p.cliente?.nombre_cliente ?? p.id_cliente }}</td>
              <td class="px-4 py-2">{{ p.empleado?.nombre_completo ?? p.id_empleado }}</td>
              <td class="px-4 py-2">${{ p.total?.toFixed?.(2) ?? Number(p.total).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
