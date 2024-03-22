<script setup>
import { PAGE_PROGRESS } from '@/constants'
import { navigate } from '@/router'
import { ICON_CHECK_CIRCLE } from '@/icons'

import BaseIcon from './BaseIcon.vue'
</script>
<template>
  <a :href="`#${PAGE_PROGRESS}`" class="text-sm" @click="navigate(PAGE_PROGRESS)">
    <div v-if="true" class="flex items-center gap-1">
      Day complete!
      <BaseIcon :name="ICON_CHECK_CIRCLE" :classes="'h-7 text-green-500'" />
    </div>
    <div v-else class="flex items-center gap-1">
      <div>
        Progress:
        <span class="font-mono">20%</span>
      </div>
      <div class="w-3 h-3 bg-red-500 rounded-full"></div>
    </div>
  </a>
</template>
