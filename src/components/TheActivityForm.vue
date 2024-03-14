<script setup>
import { ref } from 'vue'
import { isActivityValid } from '@/validators'

import { PlusIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/BaseButton.vue'

const emit = defineEmits({ submit: isActivityValid })

const activity = ref('')

function submit() {
  emit('submit', activity.value)
  activity.value = ''
}
</script>
<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      v-model="activity"
      type="text"
      class="w-full rounded p-4 border text-xl"
      placeholder="Add an activity"
    />
    <BaseButton>
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
