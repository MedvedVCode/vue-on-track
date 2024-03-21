<script setup>
import { computed, inject } from 'vue'
import { formatSeconds, getTotalActivitySeconds } from '@/functions'
import { isActivityValid } from '@/validators'
import { timelineItemsKey } from '@/keys'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})
const classes = computed(
  () =>
    `flex items-center rounded bg-blue-100 px-2 font-mono text-xl text-blue-600 ${colorClasses.value}`
)
const colorClasses = computed(() =>
  secondsDiff.value < 0 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'
)
const seconds = computed(() => `${sign.value}${formatSeconds(secondsDiff.value)}`)
const sign = computed(() => (secondsDiff.value > 0 ? '+' : '-'))
const secondsDiff = computed(
  () =>
    getTotalActivitySeconds(props.activity, timelineItems.value) - props.activity.secondsToComplete
)
const timelineItems = inject(timelineItemsKey)
</script>

<template>
  <div :class="classes">
    {{ seconds }}
  </div>
</template>
