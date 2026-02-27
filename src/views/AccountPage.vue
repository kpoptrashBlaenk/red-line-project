<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('account')" />

    <div class="wrap">
      <!-- Account Form Modal -->
      <FormModal ref="modal" :is-open="modalOpen" :fields :state :schema @submit="onSubmit" @did-dismiss="modalOpen = false" />

      <!-- Account Form Alert -->
      <FormAlert ref="alert" @submit="onSubmit" />

      <SeparatorComponent size="xs" />

      <!-- Account List -->
      <ProfileSegment @update:form-modal="updateFormModalProfile($event)" />

      <!-- Payment Information -->
      <BillingSegment @update:form-modal="updateFormModalBilling($event)" />

      <!-- Account Delete -->
      <DangerSegment @delete:account="deleteAccount" />

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import BillingSegment from '@/components/account/BillingSegment.vue'
import DangerSegment from '@/components/account/DangerSegment.vue'
import ProfileSegment from '@/components/account/ProfileSegment.vue'
import FormAlert from '@/components/forms/FormAlert.vue'
import FormModal from '@/components/forms/FormModal.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { ApiMethod } from '@/constants/apiMethod'
import { AccountItem, FormField } from '@/types'
import translation from '@/utils/translation'
import { ref } from 'vue'
import { ZodType } from 'zod'

/* Refs */
const alert = ref()
const modal = ref()
const modalOpen = ref<boolean>(false)
const fields = ref<FormField[]>([])
const state = ref<any>({})
const schema = ref<ZodType<any>>()
const onSubmit = ref<(state?: any) => Promise<void>>(async () => {})
function updateFormModalBilling(event: {
  fields: FormField[]
  state: any
  schema: ZodType<any>
  onSubmit: (state?: AccountItem) => Promise<void>
  method: ApiMethod
}) {
  fields.value = event.fields
  state.value = event.state
  schema.value = event.schema
  onSubmit.value = async (state?: AccountItem) => {
    await event.onSubmit(state)
    modal.value.$el.dismiss()
    alert.value.$el.dismiss()
  }

  event.method !== 'delete' ? modal.value.$el.present() : alert.value.$el.present()
}

function updateFormModalProfile(event: {
  fields: FormField[]
  state: any
  schema: ZodType<any>
  onSubmit: (state?: AccountItem) => Promise<void>
}) {
  fields.value = event.fields
  state.value = event.state
  schema.value = event.schema
  onSubmit.value = async (state?: AccountItem) => {
    await event.onSubmit(state)
    modal.value.$el.dismiss()
  }
  modalOpen.value = true
}

function deleteAccount(event: () => Promise<void>) {
  alert.value.$el.present()

  onSubmit.value = event
}
</script>

<style lang="css" scoped>
ion-item {
  --detail-icon-color: white;
  --detail-icon-opacity: 1;
  --detail-icon-font-size: 32px;
}
</style>
