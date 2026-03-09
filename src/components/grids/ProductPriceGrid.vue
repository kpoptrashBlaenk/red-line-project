<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 items-center">
    <IonList class="bg-light">
      <IonRadioGroup :value="selectedLength" @ion-change="selectedLength = $event.detail.value">
        <IonItem v-for="(length, key) in lengthRadio" :key lines="none" color="light" class="text-lg lg:text-xl">
          <IonRadio :value="length.value">{{ length.label }}</IonRadio>
        </IonItem>
      </IonRadioGroup>
    </IonList>

    <IonList class="bg-light">
      <IonRadioGroup :value="selectedUser" @ion-change="selectedUser = $event.detail.value">
        <IonItem v-for="(user, key) in usersRadio" :key lines="none" color="light" class="text-lg lg:text-xl">
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

    <NumberStepper v-model:amount="selectedAmount" :default="selectedAmount" :min="canZero ? 0 : 1" class="mx-auto" />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Product, SubscriptionLength, SubscriptionUsers } from '$/types'
import calculatePrice from '@/utils/calculatePrice'
import translation from '@/utils/translation'
import { IonItem, IonList, IonRadio, IonRadioGroup } from '@ionic/vue'
import { computed, ref, watch } from 'vue'
import NumberStepper from '../ui/NumberStepper.vue'
import TitleComponent from '../ui/text/TitleComponent.vue'

/* Props */
const props = defineProps<{
  product: Product
  length?: SubscriptionLength
  users?: SubscriptionUsers
  amount?: number
  canZero?: boolean
}>()

/* Constants */
const lengthRadio = [
  { value: SubscriptionLength.monthly, label: translation('monthly') },
  { value: SubscriptionLength.yearly, label: translation('yearly') },
]
const usersRadio = [
  { value: SubscriptionUsers.user, label: translation('user') },
  { value: SubscriptionUsers.device, label: translation('device') },
]

/* Refs */
const selectedLength = ref(props.length ?? lengthRadio[0].value)
const selectedUser = ref(props.users ?? usersRadio[0].value)
const selectedAmount = ref(props.amount ?? 1)

/* Emits */
const emit = defineEmits(['update:modelValue'])

/* Computeds */
const calculatedPrice = computed(() => {
  const price = calculatePrice(props.product.price, selectedLength.value, selectedUser.value, selectedAmount.value)

  return price
})

/* Watches */
watch(
  [selectedLength, selectedUser, selectedAmount],
  () => {
    // emit with watch because computed emits constantly
    emit('update:modelValue', {
      product: props.product,
      length: selectedLength.value,
      users: selectedUser.value,
      amount: selectedAmount.value,
    })
  },
  { immediate: true },
)
</script>
