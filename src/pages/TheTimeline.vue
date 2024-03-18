<script setup>
import { watchPostEffect, ref, nextTick } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'
import {
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
  isTimelineItemValid,
  isActivityValid,
  isPageValid,
  isNumber
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
    scrollToHour(null)
  }
})

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= new Date().getHours()
  const options = {
    behavior: isSmooth ? 'smooth' : 'instant'
  }
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options)
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView(options)
  }
}

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
  },
  updateTimelineActivitySeconds(timelineItem, activitySeconds) {
    return [isTimelineItemValid(timelineItem), isNumber(activitySeconds)].every(Boolean)
  }
})

defineExpose({ scrollToHour })
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
        @update-activity-seconds="emit('updateTimelineActivitySeconds', timelineItem, $event)"
      />
    </ul>
  </div>
</template>
