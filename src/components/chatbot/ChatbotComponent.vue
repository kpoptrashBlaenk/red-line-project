<template>
  <ChatbotFab @open:modal="modal.$el.present()" />
  <ChatbotModal ref="modal" />
</template>

<script setup lang="ts">
/* Imports */
import { onMounted, ref } from 'vue'
import ChatbotFab from './ChatbotFab.vue'
import ChatbotModal from './ChatbotModal.vue'

/* Refs */
const modal = ref()

onMounted(() => {
  modal.value.$el.present()
})
</script>
