<template>
  <div>
    <!-- Filter Button -->
    <SolidButton :id="`${context}-popover`" :color :label expand="block" @click="resetItems" />

    <!-- Filter Popover -->
    <IonPopover ref="popover" :trigger="`${context}-popover`" @ion-popover-did-dismiss="temporarySelected = []">
      <div class="flex flex-col gap-2 pt-5 px-5 pb-3">
        <IonCheckbox
          v-for="(item, key) in items"
          :key
          :checked="isChecked(item.id) ?? false"
          justify="space-between"
          :color
          @ion-change="toggleSelect($event.detail.checked, item)"
        >
          {{ translation(item[chipKey]) }}
        </IonCheckbox>
      </div>

      <CancelOkButtons :color :on-cancel="dismiss" :on-ok="applySelected" />
    </IonPopover>

    <!-- Filter Chips but teleported to chip-wrapper -->
    <Teleport defer to="#chips-row">
      <IonChip
        v-for="(item, key) in selected.sort((a, b) => a.id - b.id)"
        :key
        :color
        class="text-xs px-2 shrink-0"
        @click="unselectItem(item.id)"
      >
        <IonLabel class="me-1">
          {{ translation(item[chipKey] as LanguageRecord) }}
        </IonLabel>

        <IonIcon :icon="closeCircleOutline" />
      </IonChip>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { LanguageRecord } from '$/types'
import CancelOkButtons from '@/components/ui/buttons/CancelOkButtons.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import { Color } from '@/types'
import translation from '@/utils/translation'
import { IonCheckbox, IonChip, IonIcon, IonLabel, IonPopover } from '@ionic/vue'
import { closeCircleOutline } from 'ionicons/icons'
import { ref } from 'vue'

/* Props */
const props = defineProps<{
  context: string
  color: Color
  label: string
  chipKey: string
  items: any[]
  onUpdate: (items: any[]) => void
}>()

/* Refs */
const selected = ref<any[]>([])
const temporarySelected = ref<any[]>([])
const popover = ref()

/* Functions */
function resetItems() {
  temporarySelected.value = [...selected.value]
}

function unselectItem(itemId: number) {
  selected.value.splice(
    selected.value.findIndex((item) => item.id === itemId),
    1,
  )

  applySelected()
}

function isChecked(itemId: number) {
  return selected.value.find((item) => item.id === itemId)
}

function toggleSelect(checked: boolean, item: any) {
  checked
    ? temporarySelected.value.push(item)
    : temporarySelected.value.splice(
        temporarySelected.value.findIndex((i) => i.id === item.id),
        1,
      )
}

function dismiss() {
  popover.value.$el.dismiss()
}

function applySelected() {
  selected.value = temporarySelected.value
  props.onUpdate(selected.value)
  dismiss()
}
</script>
