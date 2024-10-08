import {
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  MILLISECONDS_IN_SECOND,
  LOW_PERCENT,
  MEDIUM_PERCENT,
  HUNDRED_PERCENT
} from '@/constants'
import { isNull } from './validators'

export function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function normalizaSelectValue(value) {
  return isNull(value) || isNaN(value) ? value : +value
}

export function generatePeriodSelectOptions() {
  const periodsInMinutes = [
    15, 30, 45, 60, 75, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 480
  ]
  return periodsInMinutes.map((minutes) => ({
    value: minutes * SECONDS_IN_MINUTE,
    label: generatePeriodSelectOptionsLabel(minutes)
  }))
}

function generatePeriodSelectOptionsLabel(minutes) {
  const hours = Math.floor(minutes / MINUTES_IN_HOUR)
    .toString()
    .padStart(2, '0')
  const remainingMinutes = (minutes % MINUTES_IN_HOUR).toString().padStart(2, '0')
  return `${hours}:${remainingMinutes}`
}

export function formatSeconds(seconds) {
  const date = new Date()
  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND)
  const utc = date.toUTCString()
  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}

export function currentHour() {
  return new Date().getHours()
}

export function getProgressColorClass(percentage) {
  if (percentage < LOW_PERCENT) return 'bg-red-500'
  if (percentage < MEDIUM_PERCENT) return 'bg-yellow-500'
  if (percentage < HUNDRED_PERCENT) return 'bg-blue-500'
  return 'bg-green-500'
}
