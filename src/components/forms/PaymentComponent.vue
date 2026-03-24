<template>
  <div class="stripe-wrapper" :class="{ 'ion-touched': touched, 'ion-invalid': !!error }">
    <div class="stripe-input-container" :class="{ 'has-value': hasValue, focused: isFocused }">
      <label class="stripe-label" :class="{ card: field.type === 'cardNumber' }">{{ field.label }}</label>
      <div ref="mountRef" class="stripe-mount" />
    </div>
    <span v-if="error" class="stripe-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { PaymentField } from '@/types'
import { getElements, getStripe, resetElements } from '@/utils/stripe'
import { onIonViewWillLeave } from '@ionic/vue'
import type { StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js'
import { onMounted, ref, toRef } from 'vue'

/* Props */
const props = defineProps<{
  field: PaymentField
  state: Record<string, any>
}>()

/* Refs */
const field = toRef(props, 'field')
const state = toRef(props, 'state')
const mountRef = ref<HTMLDivElement>()
const touched = ref(false)
const error = ref('')
const isFocused = ref(false)
const hasValue = ref(false)

let element: StripeCardNumberElement | StripeCardExpiryElement | StripeCardCvcElement | null = null

/* Mount Stripe Element */
onMounted(async () => {
  if (!mountRef.value) return

  const stripe = await getStripe()
  const elements = getElements(stripe)

  const style = {
    base: {
      color: 'var(--ion-text-color)',
      fontFamily: 'inherit',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: 'transparent',
      },
    },
    invalid: {
      color: 'var(--ion-color-danger)',
    },
  }

  if (field.value.type === 'cardNumber') {
    element = elements.create('cardNumber', { style, showIcon: true })
  } else if (field.value.type === 'cardExpiry') {
    element = elements.create('cardExpiry', { style })
  } else {
    element = elements.create('cardCvc', { style })
  }

  element.mount(mountRef.value)

  // @ts-expect-error testing
  element.on('focus', () => {
    isFocused.value = true
  })

  // @ts-expect-error testing
  element.on('blur', () => {
    isFocused.value = false
    touched.value = true
    if (!hasValue.value) error.value = field.value.label + ' is required'
  })

  // @ts-expect-error testing
  element.on('change', (event: any) => {
    hasValue.value = !event.empty
    touched.value = true

    if (event.error) {
      error.value = event.error.message
      state.value[field.value.name] = undefined
    } else if (event.complete) {
      error.value = ''
      // Signal to parent that this element is complete
      // Token is generated at form submit level, not per-field
      state.value[field.value.name] = 'complete'
      state.value[field.value.name + 'Element'] = element
    } else {
      error.value = ''
      state.value[field.value.name] = undefined
      state.value[field.value.name + 'Element'] = undefined
    }
  })
})

onIonViewWillLeave(() => {
  element?.destroy()
  resetElements()
})
</script>

<style scoped>
.stripe-wrapper {
  width: 100%;
}

.stripe-input-container {
  position: relative;
  background: transparent;
  border-radius: 4px;
  border-bottom: 1px solid var(--ion-color-primary-tint);
  padding: 14px 16px 0px;
  min-height: 56px;
  transition: border-color 0.2s;
  cursor: text;
}

.stripe-input-container.focused {
  border-bottom: 2px solid var(--ion-color-primary-shade);
}

.stripe-wrapper.ion-invalid.ion-touched .stripe-input-container {
  border-bottom-color: var(--ion-color-danger);
}

.stripe-label {
  position: absolute;
  top: 70%;
  left: 16px;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition:
    top 0.15s ease,
    font-size 0.15s ease,
    color 0.15s ease;
}

.stripe-label.card {
  left: 48px;
}

/* Float label when focused or has value */
.stripe-input-container.focused .stripe-label,
.stripe-input-container.has-value .stripe-label {
  top: 10px;
  transform: none;
  font-size: 12px;
  color: var(--ion-color-primary-shade);
}

.stripe-input-container.focused.has-value .stripe-label,
.stripe-wrapper.ion-invalid.ion-touched .stripe-label {
  color: var(--ion-color-danger);
}

.stripe-mount {
  margin-top: 20px;
  height: 24px;
}

.stripe-error {
  display: block;
  margin-top: 4px;
  margin-left: 16px;
  font-size: 12px;
  color: var(--ion-color-danger);
}
</style>
