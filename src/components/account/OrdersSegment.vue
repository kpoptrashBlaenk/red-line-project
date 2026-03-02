<template>
  <div class="wrap pt-4!"></div>
</template>

<script setup lang="ts">
/* Imports */
import { Order } from '$/types'
import { ref } from 'vue'

/* Refs */
const orders = ref<Order[]>([])
</script>
