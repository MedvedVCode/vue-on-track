import { ref, computed } from 'vue'
import { SECONDS_IN_HOUR, HUNDRED_PERCENT } from './constants'
import { id } from './functions'
import { getTotalActivitySeconds } from './timeline-items'

export const activities = ref(generateActivities())
export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete > 0)
)
export const activitySelectOptions = computed(() => generateActivitySelectOptions())
export const createActivity = (activity) => {
  activities.value.push(activity)
}
export const deleteActivity = (activity) => {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export const updateActivity = (activity, fields) => {
  return Object.assign(activity, fields)
}

export function getActivityProgress(activity) {
  return Math.floor(
    (getTotalActivitySeconds(activity) * HUNDRED_PERCENT) / activity.secondsToComplete
  )
}

function generateActivitySelectOptions() {
  return activities.value.map((activity) => ({ label: activity.name, value: activity.id }))
}

function generateActivities() {
  return ['Coding', 'Training', 'Reading'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: 15 * 60 //hours * SECONDS_IN_HOUR
  }))
}
