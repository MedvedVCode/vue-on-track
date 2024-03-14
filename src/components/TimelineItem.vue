<script setup>
import { ref } from 'vue'
import { isTimelineItemValid, validateSelectOptions } from '@/validators'

import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  },
  activitySelectOptions: {
    required: true,
    type: Array,
    validator: validateSelectOptions
  }
})

const selectActivityId = ref(0)
</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :selected="selectActivityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="selectActivityId = $event"
    />
  </li>
</template>
