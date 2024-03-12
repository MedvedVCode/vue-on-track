<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { PAGE_PROGRESS } from '@/constants'

defineEmits(['goToProgress'])
</script>
<template>
  <a :href="`#${PAGE_PROGRESS}`" class="text-sm" @click="$emit('goToProgress')">
    <div v-if="true" class="flex items-center gap-1">
      Day complete!
      <CheckCircleIcon class="h-7 text-green-500" />
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
