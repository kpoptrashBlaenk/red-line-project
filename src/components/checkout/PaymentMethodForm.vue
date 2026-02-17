<template>
  <IonList>
    <IonRadioGroup>
      <IonItem v-for="(paymentMethod, key) in paymentMethods" :key>
        <IonRadio :value="paymentMethod.id">
          <div>{{ paymentMethod.name }}</div>
          <div>{{ paymentMethod.last4 }}</div>
          <div>{{ paymentMethod.expiration }}</div>
        </IonRadio>
      </IonItem>
      <SolidButton
        color="secondary"
        :label="translation('add_payment')"
        expand="block"
        class="mt-2"
        @click="$emit('on-modal-open')"
      />
    </IonRadioGroup>
  </IonList>
</template>

<script setup lang="ts">
/* Imports */
import { PaymentMethod } from '$/types'
import translation from '@/utils/translation'
import { IonItem, IonList, IonRadio, IonRadioGroup } from '@ionic/vue'
import SolidButton from '../ui/buttons/SolidButton.vue'

/* Props */
defineProps<{
  paymentMethods: PaymentMethod[]
}>()
</script>
