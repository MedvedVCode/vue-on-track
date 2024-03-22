<script setup>
import { ref, nextTick } from 'vue'
import { id } from '@/functions'
import { createActivity } from '@/activities'
import { ICON_PLUS } from '@/icons'

import BaseIcon from './BaseIcon.vue'
import BaseButton from '@/components/BaseButton.vue'

const name = ref('')

async function submit() {
  createActivity({
    id: id(),
    name: name.value,
    secondsToComplete: 0
  })
  name.value = ''
  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}
</script>
<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      v-model="name"
      type="text"
      class="w-full rounded p-4 border text-xl"
      placeholder="Add an activity"
    />
    <BaseButton :disabled="name.trim() === ''">
      <BaseIcon :name="ICON_PLUS" />
    </BaseButton>
  </form>
</template>
../icons
