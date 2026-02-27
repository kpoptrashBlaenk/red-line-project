<template>
  <SolidButton
    :icon="alertCircleOutline"
    :label="translation('delete_account')"
    color="danger"
    size="large"
    expand="block"
    @click="emit('delete:account', onSubmit)"
  />
</template>

<script setup lang="ts">
/* Imports */
import { useAuth } from '@/composables/auth'
import translation from '@/utils/translation'
import { alertCircleOutline } from 'ionicons/icons'
import SolidButton from '../ui/buttons/SolidButton.vue'

/* Constants */
const { deleteUser } = useAuth()
const onSubmit = async () => {
  await deleteUser()
  location.reload()
}

/* Emits */
const emit = defineEmits(['delete:account'])
</script>
