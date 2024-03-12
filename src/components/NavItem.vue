<script setup></script>
<script>
export default {
  inheritAttrs: false
}
</script>

<template>
  <li class="flex-1">
    <a class="flex flex-col text-sx items-center capitalize p-2" v-bind="$attrs">
      <slot></slot>
    </a>
  </li>
</template>
