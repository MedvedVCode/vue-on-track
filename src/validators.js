import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR, BUTTON_TYPES } from './constants'
import { ICONS } from './icons'

export function isPageValid(page) {
  return NAV_ITEMS.some((item) => item.page === page)
}

export function isNavItemValid(navItem) {
  return NAV_ITEMS.includes(navItem)
}

export function isTimelineItemValid({ hour }) {
  return isHourValid(hour)
}

export function isHourValid(hour) {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY - 1)
}

export function isSelectValueValid(value) {
  return isNumberOrNull(value) || isNotEmptyString(value)
}

export function validateSelectOptions(options) {
  return options.every(isSelectOptionValid)
}

export function isSelectOptionValid({ value, label }) {
  return (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label)
}

export function validateTimelineItems(timelineItems) {
  return timelineItems.every(isTimelineItemValid)
}

export function isUndefinedOrNull(value) {
  return isUndefined(value) || isNull(value)
}

export function isNumberOrNull(value) {
  return isNumber(value) || isNull(value)
}

export const isNull = (value) => value === null

export const isUndefined = (value) => value === undefined

export const isNumber = (value) => typeof value === 'number'

const isString = (value) => typeof value === 'string'

const isBetween = (value, start, end) => value >= start && value <= end

export function validateActivities(array) {
  return array.every(isActivityValid)
}

export function isActivityValid({ id, name, secondsToComplete }) {
  if (isNull(id)) return true
  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

export function isNotEmptyString(value) {
  return isString(value) && value.length > 0
}

export const isButtonTypeValid = (type) => BUTTON_TYPES.includes(type)

export function isIconValid(icon) {
  return Object.keys(ICONS).includes(icon)
}
