<script setup>
import { computed } from 'vue'
import { navigate, currentPage } from '@/router'
import { isNavItemValid } from '@/validators'

import BaseIcon from './BaseIcon.vue'

const classes = computed(() => [
  'flex flex-col text-sx items-center capitalize p-2',
  { 'bg-gray-200 pointer-events-none': currentPage.value === props.navItem.page }
])

const props = defineProps({
  navItem: { type: Object, required: true, validator: isNavItemValid }
})
</script>

<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" @click="navigate(navItem.page)" :class="classes">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" />
      {{ navItem.page }}
    </a>
  </li>
</template>
