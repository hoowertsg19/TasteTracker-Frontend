import { ref, onMounted } from 'vue'
import { dashboardAPI } from '@/services/api'

export function useDashboard() {
  const stats = ref<any>(null)
  const ventasChart = ref<any>(null)
  const pedidosRecientes = ref<any[]>([])
  const resumen = ref<any>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchStats = async () => {
    try {
      stats.value = await dashboardAPI.getStats()
    } catch (err: any) {
      console.error('Error fetching stats:', err)
      error.value = 'Error al cargar estadísticas'
    }
  }

  const fetchVentasChart = async (dias: number = 7) => {
    try {
      ventasChart.value = await dashboardAPI.getVentasChart(dias)
    } catch (err: any) {
      console.error('Error fetching ventas chart:', err)
    }
  }

  const fetchPedidosRecientes = async (limit: number = 5) => {
    try {
      pedidosRecientes.value = await dashboardAPI.getPedidosRecientes(limit)
    } catch (err: any) {
      console.error('Error fetching pedidos:', err)
    }
  }

  const fetchResumen = async () => {
    try {
      resumen.value = await dashboardAPI.getResumen()
    } catch (err: any) {
      console.error('Error fetching resumen:', err)
    }
  }

  const fetchAllData = async () => {
    loading.value = true
    error.value = null

    await Promise.all([fetchStats(), fetchVentasChart(), fetchPedidosRecientes(), fetchResumen()])

    loading.value = false
  }

  const refresh = () => {
    fetchAllData()
  }

  onMounted(() => {
    fetchAllData()
  })

  return {
    stats,
    ventasChart,
    pedidosRecientes,
    resumen,
    loading,
    error,
    refresh,
    fetchVentasChart,
  }
}
