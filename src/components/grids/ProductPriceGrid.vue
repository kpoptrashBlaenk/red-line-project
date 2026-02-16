<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 items-center">
    <IonList class="bg-light">
      <IonRadioGroup :value="selectedPeriod" @ion-change="selectedPeriod = $event.detail.value">
        <IonItem v-for="(period, key) in periods" :key lines="none" color="light" class="text-lg lg:text-xl">
          <IonRadio :value="period.value">{{ period.label }}</IonRadio>
        </IonItem>
      </IonRadioGroup>
    </IonList>

    <IonList class="bg-light">
      <IonRadioGroup :value="selectedUser" @ion-change="selectedUser = $event.detail.value">
        <IonItem v-for="(user, key) in users" :key lines="none" color="light" class="text-lg lg:text-xl">
          <IonRadio :value="user.value">{{ user.label }}</IonRadio>
        </IonItem>
      </IonRadioGroup>
    </IonList>

    <div class="col-span-2 border border-gray-200 -mt-5 lg:hidden"></div>

    <TitleComponent
      :text="`<title>${calculatedPrice}€</title>`"
      color="primary"
      class="text-5xl sm:text-6xl xl:text-7xl lg:order-first"
    />

    <NumberStepper v-model:amount="amount" :default="amount" :min="1" class="mx-auto" />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Product, SubscriptionLength, SubscriptionUsers } from '$/types'
import calculatePrice from '@/utils/calculatePrice'
import translation from '@/utils/translation'
import { IonItem, IonList, IonRadio, IonRadioGroup } from '@ionic/vue'
import { computed, ref } from 'vue'
import NumberStepper from '../ui/NumberStepper.vue'
import TitleComponent from '../ui/text/TitleComponent.vue'

/* Props */
const props = defineProps<{
  product: Product
}>()

/* Constants */
const periods = [
  { value: SubscriptionLength.monthly, label: translation('monthly') },
  { value: SubscriptionLength.yearly, label: translation('yearly') },
]
const users = [
  { value: SubscriptionUsers.user, label: translation('per_user') },
  { value: SubscriptionUsers.device, label: translation('per_device') },
]

/* Refs */
const selectedPeriod = ref(periods[0].value)
const selectedUser = ref(users[0].value)
const amount = ref(1)

/* Emits */
const emit = defineEmits(['update:modelValue'])

/* Computeds */
const calculatedPrice = computed(() => {
  const price = calculatePrice(props.product.price, selectedPeriod.value, selectedUser.value, amount.value)

  emit('update:modelValue', {
    product: props.product,
    length: selectedPeriod.value,
    users: selectedUser.value,
    amount: amount.value,
  })

  return price
})
</script>
