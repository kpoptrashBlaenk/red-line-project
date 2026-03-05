<template>
  <DefaultContentLayout v-if="userStore.user?.is_admin">
    <!-- Hero Page Grid -->
    <HeroComponent>
      <AdminPageGrid :selected-page @update:selected-page="selectedPage = $event" />
    </HeroComponent>

    <!-- Pages Tab -->
    <PagesAdminTab v-if="selectedPage === 'pages'" />
  </DefaultContentLayout>

  <NotFoundPage v-else />
</template>

<script setup lang="ts">
/* Imports */
import PagesAdminTab from '@/components/admin/PagesAdminTab.vue'
import AdminPageGrid from '@/components/grids/AdminPageGrid.vue'
import DefaultContentLayout from '@/components/layouts/default/DefaultContentLayout.vue'
import HeroComponent from '@/components/ui/HeroComponent.vue'
import { AdminPageKey } from '@/constants/adminPages'
import { useUserStore } from '@/stores/user'
import NotFoundPage from '@/views/404Page.vue'
import { ref } from 'vue'

/* Constants */
const userStore = useUserStore()

/* Refs */
const selectedPage = ref<AdminPageKey>('pages')
</script>
