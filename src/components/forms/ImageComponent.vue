<template>
  <div class="ps-5">
    <div class="flex justify-center">
      <img v-if="image" :src="image" class="mt-2 rounded-2xl object-fit max-w-62 max-h-62 border border-primary" />
    </div>

    <SolidButton
      :aria-label="field.label"
      :label="field.label"
      color="primary"
      :icon="cloudUploadOutline"
      expand="block"
      class="mt-4"
      @click="openGallery"
    />

    <div v-if="field.touched && field.error" class="text-danger text-xs" style="margin-top: 9px">{{ field.error }}</div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import maxFileSize from '$/constants/maxFileSize'
import type { ImageField } from '@/types'
import translation from '@/utils/translation'
import { FilePicker } from '@capawesome/capacitor-file-picker'
import { cloudUploadOutline } from 'ionicons/icons'
import { ref, toRef } from 'vue'
import z from 'zod'
import SolidButton from '../ui/buttons/SolidButton.vue'

/* Props */
const props = defineProps<{
  field: ImageField
  state: Record<string, any>
  schema: z.ZodType<any> | undefined
}>()

/* Refs */
const field = toRef(props, 'field')
const state = toRef(props, 'state')
const image = ref<string | undefined>(state.value[field.value.name])

/* Functions */
async function openGallery() {
  const chosen = (value: Blob | undefined, error?: string) => {
    state.value[field.value.name] = value
    image.value = value ? URL.createObjectURL(value) : value
    field.value.error = error ?? ''
    markTouched()
  }

  try {
    // open gallery
    const file = (await FilePicker.pickImages({ limit: 1 })).files[0]

    // no file
    if (!file) {
      chosen(undefined, translation('no_file'))
      return
    }

    // not an image
    if ((!file.mimeType.startsWith('data:image') && !file.mimeType.startsWith('image')) || !file.blob) {
      chosen(undefined, translation('not_an_image'))
      return
    }

    // image too big
    if (file.size > maxFileSize) {
      chosen(undefined, translation('file_too_big'))
      return
    }

    // preview
    chosen(file.blob)

    // error (usually on selection cancel)
  } catch (error) {
    return
  }
}

function validate() {
  const result = props.schema!.safeParse(state.value)

  if (!result.success) {
    const issue = result.error.issues.find((issue) => issue.path[0] === field.value.name)
    field.value.error = issue ? issue.message : ''
  } else {
    field.value.error = ''
  }
}

function markTouched() {
  field.value.touched = true
  validate()
}
</script>
