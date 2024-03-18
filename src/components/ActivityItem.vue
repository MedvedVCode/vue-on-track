<script setup>
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from '@/constants'
import { isActivityValid, isUndefined, isNumber, validateTimelineItems } from '@/validators'
import { TrashIcon } from '@heroicons/vue/24/outline'

import ActivitySecondsToComplite from '@/components/ActivitySecondsToComplete.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

defineProps({
  activity: { type: Object, required: true, validator: isActivityValid },
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems
  }
})

const emit = defineEmits({ delete: isUndefined, setSecondsToComplete: isNumber })
</script>
<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="font-mono grow"
        placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="activity.secondsToComplete || null"
        @select="emit('setSecondsToComplete', $event || 0)"
      />
      <ActivitySecondsToComplite
        :activity="activity"
        v-if="activity.secondsToComplete"
        :timeline-items="timelineItems"
      />
    </div>
  </li>
</template>
