<template>
  <div
    class="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group"
  >
    <div class="flex items-center justify-between mb-4">
      <div
        class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
        :class="iconBgClass"
      >
        {{ icon }}
      </div>
      <div
        v-if="cambio !== null && cambio !== undefined"
        class="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
        :class="tendencia === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
      >
        <svg
          class="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          :class="{ 'rotate-180': tendencia === 'down' }"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        {{ Math.abs(cambio) }}%
      </div>
    </div>

    <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
      {{ title }}
    </h3>

    <p class="text-3xl font-black text-gray-900 mb-1">
      <span v-if="prefix">{{ prefix }}</span
      >{{ formattedValue }}<span v-if="suffix">{{ suffix }}</span>
    </p>

    <p v-if="description" class="text-sm text-gray-600">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  value: number | string
  icon: string
  iconBgClass?: string
  cambio?: number | null
  tendencia?: 'up' | 'down'
  prefix?: string
  suffix?: string
  description?: string
}>()

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString('es-MX')
  }
  return props.value
})
</script>
