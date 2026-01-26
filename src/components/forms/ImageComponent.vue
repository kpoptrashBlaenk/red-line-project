<template>
  <div>
    <IonReorderGroup :disabled="!field.multiple" @ion-reorder-end="reorder">
      <div v-for="(image, key) in images" :key class="mb-2 relative">
        <IonReorder class="rounded-2xl">
          <div class="flex justify-center">
            <img v-if="image" :src="image.preview" class="rounded-2xl object-fit border border-primary" />
          </div>
        </IonReorder>

        <IonButton
          v-if="field.multiple"
          shape="round"
          color="danger"
          class="absolute z-10"
          style="top: -5px; right: -5px"
          @click="removeImage(image)"
        >
          <IonIcon slot="icon-only" :icon="closeCircleOutline" />
        </IonButton>
      </div>
    </IonReorderGroup>

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
import isLengthZero from '@/utils/isLengthZero'
import translation from '@/utils/translation'
import { FilePicker } from '@capawesome/capacitor-file-picker'
import { IonButton, IonIcon, IonReorder, IonReorderGroup, ReorderEndCustomEvent } from '@ionic/vue'
import { closeCircleOutline, cloudUploadOutline } from 'ionicons/icons'
import { nextTick, ref, toRef, watch } from 'vue'
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
const images = ref<{ file: File; preview: string }[]>(
  state.value[field.value.name]?.map((f: any) => ({
    file: f,
    preview: typeof f === 'string' ? f : URL.createObjectURL(f),
  })) || [],
)

/* Watches */
watch(
  images,
  (newImages) => {
    state.value[field.value.name] = newImages.map((image) => image.file)
  },
  { deep: true },
)

/* Functions */
async function openGallery() {
  try {
    // open gallery
    const files = (await FilePicker.pickImages({ limit: field.value.multiple ? 0 : 1, ordered: true })).files

    // no file
    if (!files || isLengthZero(files)) throw new Error(translation('no_file'))

    // not an image
    for (const file of files) {
      if ((!file.mimeType.startsWith('data:image') && !file.mimeType.startsWith('image')) || !file.blob) {
        throw new Error(translation('not_an_image'))
      }

      // image too big
      if (file.size > maxFileSize) {
        throw new Error(translation('file_too_big'))
      }

      // push/replace
      if (field.value.multiple) {
        images.value.push({
          file: new File([file.blob], file.name, { type: file.blob.type }),
          preview: URL.createObjectURL(file.blob),
        })
      } else {
        images.value = [
          {
            file: new File([file.blob], file.name, { type: file.blob.type }),
            preview: URL.createObjectURL(file.blob),
          },
        ]
      }
    }
    field.value.error = ''

    // error (selection cancel too)
  } catch (error: any) {
    field.value.error = error
  }

  markTouched()
}

async function validate() {
  await nextTick()

  const result = await props.schema!.safeParseAsync(state.value)

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

function reorder(event: ReorderEndCustomEvent) {
  event.detail.complete(images.value)
}

function removeImage(image: { file: File; preview: string }) {
  const index = images.value.findIndex((i) => i.preview === image.preview)
  if (index !== -1) {
    images.value.splice(index, 1)
    markTouched()
  }
}
</script>
