<template>
  <img v-if="localSrc" :src="localSrc" />
</template>

<script setup lang="ts">
/* Imports */
import { useNgrokImage } from '@/composables/ngrok'
import isDesktop from '@/utils/isDesktop'
import { onMounted, ref, watch } from 'vue'

// Props
const props = defineProps<{ src: string }>()

// Constants
const { getNgrokSrc } = useNgrokImage()

// Refs
const localSrc = ref('')

// Watches
watch(() => props.src, load)

// Lifecycle Hooks
onMounted(load)

// Functions
async function load() {
  localSrc.value = isDesktop() ? props.src : await getNgrokSrc(props.src)
}
</script>
