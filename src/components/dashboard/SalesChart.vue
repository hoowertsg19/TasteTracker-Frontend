<template>
  <div class="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-lg">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-xl font-bold text-gray-900">Ventas</h3>
        <p class="text-sm text-gray-600">Evolución de ventas diarias</p>
      </div>
      <div class="flex gap-2">
        <button
          v-for="periodo in periodos"
          :key="periodo.dias"
          @click="cambiarPeriodo(periodo.dias)"
          class="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
          :class="
            diasSeleccionados === periodo.dias
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
        >
          {{ periodo.label }}
        </button>
      </div>
    </div>

    <div class="relative h-80">
      <Line v-if="chartData" :data="chartData" :options="chartOptions" />
      <div v-else class="flex items-center justify-center h-full">
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const props = defineProps<{
  data: {
    labels: string[]
    ventas: number[]
    pedidos?: number[]
  } | null
}>()

const emit = defineEmits<{
  (e: 'change-period', dias: number): void
}>()

const periodos = [
  { label: '7 días', dias: 7 },
  { label: '30 días', dias: 30 },
  { label: '90 días', dias: 90 },
]

const diasSeleccionados = ref(7)

const cambiarPeriodo = (dias: number) => {
  diasSeleccionados.value = dias
  emit('change-period', dias)
}

const chartData = computed(() => {
  if (!props.data) return null

  return {
    labels: props.data.labels,
    datasets: [
      {
        label: 'Ventas ($)',
        data: props.data.ventas,
        borderColor: '#F97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#F97316',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleColor: '#fff',
      bodyColor: '#fff',
      displayColors: false,
      callbacks: {
        label: (context: any) => {
          return `Ventas: $${context.parsed.y.toLocaleString('es-MX')}`
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: any) => `$${value.toLocaleString('es-MX')}`,
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}
</script>
