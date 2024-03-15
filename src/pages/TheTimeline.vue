<script setup>
import { watchPostEffect, ref, nextTick } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'
import {
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
  isTimelineItemValid,
  isActivityValid,
  isPageValid
} from '@/validators'
import TimelineItem from '@/components/TimelineItem.vue'

const props = defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions
  },
  activities: {
    type: Array,
    required: true,
    validator: validateActivities
  },
  currentPage: {
    type: String,
    required: true,
    validator: isPageValid
  }
})

const timelineItemRefs = ref([])

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(new Date().getHours())
  }
})

function scrollToHour(hour) {
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView({ behavior: 'smooth' })
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView({ behavior: 'smooth' })
  }
}

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
  }
})
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
        :activities="activities"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>
