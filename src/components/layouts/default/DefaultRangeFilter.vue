<template>
  <div>
    <!-- Filter Button -->
    <SolidButton :id="`${context}-popover`" :color :label expand="block" @click="resetItems" />

    <!-- Filter Popover -->
    <IonPopover ref="popover" :trigger="`${context}-popover`" @ion-popover-did-dismiss="temporaryRange = defaultRange">
      <div class="pt-5 px-5 pb-3">
        <IonRange
          v-model="temporaryRange"
          dual-knobs
          :color
          :value="{
            lower: selected.lower,
            upper: selected.upper,
          }"
        />
        <div class="flex justify-between">
          <div>Min. {{ percentToRange(temporaryRange.lower) }}€</div>
          <div>Max. {{ percentToRange(temporaryRange.upper) }}€</div>
        </div>
      </div>

      <CancelOkButtons :color :on-cancel="dismiss" :on-ok="applySelected" />
    </IonPopover>

    <!-- Filter Chips but teleported to chip-wrapper -->
    <Teleport defer to="#chips-row">
      <IonChip
        v-if="selected.lower !== defaultRange.lower || selected.upper !== defaultRange.upper"
        :color
        class="text-xs px-2 shrink-0"
        @click="selected = defaultRange"
      >
        <IonLabel class="me-1"> {{ percentToRange(selected.lower) }}€ - {{ percentToRange(selected.upper) }}€ </IonLabel>

        <IonIcon :icon="closeCircleOutline" />
      </IonChip>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import CancelOkButtons from '@/components/ui/buttons/CancelOkButtons.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import { Color } from '@/types'
import { IonChip, IonIcon, IonLabel, IonPopover, IonRange } from '@ionic/vue'
import { closeCircleOutline } from 'ionicons/icons'
import { ref } from 'vue'

/* Types */
type Range = { lower: number; upper: number }

/* Props */
const props = defineProps<{
  context: string
  color: Color
  label: string
  min: number
  max: number
}>()

/* Emits */
const emit = defineEmits(['update:filter'])

/* Constants */
const defaultRange: Range = { lower: 0, upper: 100 }

/* Refs */
const selected = ref<Range>(defaultRange)
const temporaryRange = ref<Range>(defaultRange)
const popover = ref()

/* Functions */
function resetItems() {
  temporaryRange.value = { ...selected.value }
}

function dismiss() {
  popover.value.$el.dismiss()
}

function applySelected() {
  selected.value = temporaryRange.value
  emit(
    'update:filter',
    selected.value.lower !== defaultRange.lower || selected.value.upper !== defaultRange.upper
      ? { lower: percentToRange(selected.value.lower), upper: percentToRange(selected.value.upper) }
      : undefined,
  )
  dismiss()
}

function percentToRange(value: number) {
  return Math.round(props.min + (value / 100) * (props.max - props.min))
}
</script>
