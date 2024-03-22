import { ref, computed } from 'vue'
import { SECONDS_IN_HOUR } from './constants'
import { id } from './functions'

export const activities = ref(generateActivities())
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

function generateActivitySelectOptions() {
  return activities.value.map((activity) => ({ label: activity.name, value: activity.id }))
}

function generateActivities() {
  return ['Coding', 'Training', 'Reading'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR
  }))
}
