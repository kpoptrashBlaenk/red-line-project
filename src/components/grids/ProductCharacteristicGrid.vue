<template>
  <div
    v-for="(characteristic, key) in characteristics"
    :key
    class="flex"
    :class="{ hidden: isLengthZero(characteristic.characteristics) }"
  >
    <div class="w-32 me-5 font-bold text-xl">{{ characteristic.title }}</div>
    <div class="flex flex-wrap gap-1 items-center mb-3">
      <ChipComponent
        v-for="(char, key) in characteristic.characteristics"
        :key="key"
        :label="translation(char?.name)"
        :color="characteristic.color"
        class="text-sm! sm:text-lg!"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Characteristic } from '$/types'
import { Color } from '@/types'
import isLengthZero from '@/utils/isLengthZero'
import translation from '@/utils/translation'
import ChipComponent from '../ui/ChipComponent.vue'

/* Props */
defineProps<{
  characteristics: { [key: string]: { title: string; color: Color; characteristics: Characteristic[] } }
}>()
</script>
