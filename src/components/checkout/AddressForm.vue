<template>
  <IonList v-if="addresses.length > 0">
    <IonRadioGroup :value="selected?.id">
      <IonItem v-for="(address, key) in addresses" :key @click="$emit('update:address', address)">
        <IonRadio :value="address.id">
          <div>{{ address.first_name }} {{ address.last_name }}</div>
          <div>{{ address.street_address }}</div>
          <div>{{ `${address.postal_code} ${address.locality}, ${address.country_code}` }}</div>
        </IonRadio>
      </IonItem>
      <SolidButton
        color="secondary"
        :label="translation('add_address')"
        expand="block"
        class="mt-2"
        @click="$emit('on-modal-open')"
      />
    </IonRadioGroup>
  </IonList>
</template>

<script setup lang="ts">
/* Imports */
import { Address } from '$/types'
import translation from '@/utils/translation'
import { IonItem, IonList, IonRadio, IonRadioGroup } from '@ionic/vue'
import SolidButton from '../ui/buttons/SolidButton.vue'

/* Props */
defineProps<{
  addresses: Address[]
  selected: Address | undefined
}>()
</script>
