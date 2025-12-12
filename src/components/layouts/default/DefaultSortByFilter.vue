<template>
  <!-- Sort Button -->
  <SolidButton :id="`${context}-popover`" :color :label :icon="funnelOutline" expand="block" @click="resetItems" />

  <!-- Sort Popover -->
  <IonPopover ref="popover" :trigger="`${context}-popover`" @ion-popover-did-dismiss="temporarySelected = 'default'">
    <IonList lines="none">
      <IonRadioGroup v-model="temporarySelected" :value="selected">
        <IonItem v-for="(item, key) in items" :key>
          <IonRadio :value="item.value" :color>
            {{ item.label }}
          </IonRadio>
        </IonItem>
      </IonRadioGroup>
    </IonList>

    <CancelOkButtons :color :on-cancel="dismiss" :on-ok="applySelected" />
  </IonPopover>

  <Teleport defer to="#chips-row">
    <IonChip v-if="selected !== items[0].value" :color class="text-xs px-2 shrink-0" @click="selected = items[0].value">
      <IonIcon :icon="funnelOutline" />

      <IonLabel class="mx-1">
        {{ items.find((item) => item.value === selected)?.label }}
      </IonLabel>

      <IonIcon :icon="closeCircleOutline" />
    </IonChip>
  </Teleport>
</template>

<script lang="ts" setup>
/* Imports */
import CancelOkButtons from '@/components/ui/buttons/CancelOkButtons.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import { Color, SortOption } from '@/types'
import { IonChip, IonIcon, IonItem, IonLabel, IonList, IonPopover, IonRadio, IonRadioGroup } from '@ionic/vue'
import { closeCircleOutline, funnelOutline } from 'ionicons/icons'
import { ref } from 'vue'

/* Props */
const props = defineProps<{
  context: string
  color: Color
  label: string
  items: { value: SortOption; label: string }[]
  onUpdate: (item: SortOption) => void
}>()

/* Refs */
const selected = ref<SortOption>(props.items[0].value)
const temporarySelected = ref<SortOption>(props.items[0].value)
const popover = ref()

/* Functions */
function resetItems() {
  temporarySelected.value = selected.value
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
