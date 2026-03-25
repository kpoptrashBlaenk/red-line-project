<template>
  <IonNote v-if="timer" class="absolute left-0 -bottom-2.5 text-white bg-danger px-2 text-xs rounded-lg text-center">
    {{ timer }}
  </IonNote>
</template>

<script setup lang="ts">
/* Imports */
import { useCheckoutStore } from '@/stores/checkout'
import { IonNote } from '@ionic/vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

/* Constants */
const checkoutStore = useCheckoutStore()
let interval: number

/* Refs */
const time = ref<number>(0)

/* Computeds */
const timer = computed(() => {
  if (time.value === 0) return

  const minutes = Math.floor(time.value / 1000 / 60)
  const seconds = Math.floor((time.value / 1000) % 60)

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

/* Lifecycle Hooks */
onMounted(async () => {
  interval = window.setInterval(() => {
    time.value = checkoutStore.timer()
  }, 1000)
})

onUnmounted(() => clearInterval(interval))
</script>
