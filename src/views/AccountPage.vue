<template>
  <DefaultContentLayout>
    <HeroComponent :title="translation('account')" />

    <div class="wrap">
      <!-- Account Form Modal -->
      <FormModal ref="modal" :is-open="modalOpen" :fields :state :schema @submit="onSubmit" @did-dismiss="modalOpen = false" />

      <!-- Account Form Alert -->
      <FormAlert ref="alert" :is-open="alertOpen" @submit="onAlertSubmit" @did-dismiss="alertOpen = false" />

      <SeparatorComponent size="xs" />

      <!-- Account List -->
      <AccountList :on-modal-open="onModalOpen" />

      <!-- Account Delete -->
      <SolidButton
        :icon="alertCircleOutline"
        :label="translation('delete')"
        color="danger"
        size="large"
        expand="block"
        @click="alertOpen = true"
      />

      <SeparatorComponent size="sm" />
    </div>
  </DefaultContentLayout>
</template>

<script setup lang="ts">
/* Imports */
import FormAlert from '@/components/forms/FormAlert.vue'
import FormModal from '@/components/forms/FormModal.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import AccountList from '@/components/ui/items/AccountList.vue'
import SeparatorComponent from '@/components/ui/SeparatorComponent.vue'
import { useAuth } from '@/composables/auth'
import { useUserStore } from '@/stores/user'
import { AccountItem, FormField } from '@/types'
import translation from '@/utils/translation'
import { alertCircleOutline } from 'ionicons/icons'
import { ref } from 'vue'
import { ZodType } from 'zod'

/* Constants */
const { deleteUser } = useAuth()
const userStore = useUserStore()

/* Refs */
const modal = ref()
const modalOpen = ref<boolean>(false)
const alertOpen = ref<boolean>(false)
const fields = ref<FormField[]>([])
const state = ref<any>({})
const schema = ref<ZodType<any>>()
const onSubmit = ref<(state?: any) => Promise<void>>(async () => {})
const onAlertSubmit = ref<() => Promise<void>>(async () => {
  await deleteUser()
  location.reload()
})

/* Functions */
async function onModalOpen(item: AccountItem) {
  fields.value = item.fields
  state.value = userStore.user
  schema.value = item.schema
  onSubmit.value = async (state: any) => {
    await item.onSubmit(state)
    modal.value.$el.dismiss()
  }
  modalOpen.value = true
}
</script>

<style lang="css" scoped>
ion-item {
  --detail-icon-color: white;
  --detail-icon-opacity: 1;
  --detail-icon-font-size: 32px;
}
</style>
