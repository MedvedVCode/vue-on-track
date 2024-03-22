<script setup>
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '@/constants'
import { isActivityValid } from '@/validators'
import { deleteActivity, updateActivity } from '@/activities'
import { resetTimelineItemActivities } from '@/timeline-items'

import ActivitySecondsToComplite from '@/components/ActivitySecondsToComplete.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
defineProps({
  activity: { type: Object, required: true, validator: isActivityValid }
})

function deleteAndResetActivity(activity) {
  resetTimelineItemActivities(activity)
  deleteActivity(activity)
}
</script>
<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
        <BaseIcon name="Trash" class="h-8" />
      </BaseButton>
      <span class="truncate text-2xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="font-mono grow"
        placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="activity.secondsToComplete || null"
        @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
      />
      <ActivitySecondsToComplite :activity="activity" v-if="activity.secondsToComplete" />
    </div>
  </li>
</template>
