<template>
  <div class="wrap">
    <AccountList :on-modal-open="onModalOpen" />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { useUserStore } from '@/stores/user'
import { AccountItem } from '@/types'
import AccountList from '../ui/items/AccountList.vue'

/* Constants */
const userStore = useUserStore()

/* Emits */
const emit = defineEmits(['update:formModal'])

/* Functions */
async function onModalOpen(item: AccountItem) {
  emit('update:formModal', {
    fields: item.fields,
    state: userStore.user,
    schema: item.schema,
    onSubmit: async (state: AccountItem) => {
      await item.onSubmit(state)
    },
  })
}
</script>
