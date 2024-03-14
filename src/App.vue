<script setup>
import { ref } from 'vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'
import {
  normalizePageHash,
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities
} from './functions'

import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import TheTimeline from './pages/TheTimeline.vue'

const currentPage = ref(normalizePageHash())
const timelineItems = generateTimelineItems()
const activities = ref(generateActivities())

const goTo = (page) => (currentPage.value = page)

const activitySelectOptions = generateActivitySelectOptions(activities.value)

const createActivity = (activity) => {
  activities.value.push(activity)
}
const deleteActivity = (activity) => {
  activities.value.splice(activities.value.indexOf(activity), 1)
}
</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
    />
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @delete-activity="deleteActivity"
      @create-activity="createActivity"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
