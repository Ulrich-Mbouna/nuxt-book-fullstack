<template>
  <slot />
</template>

<script setup>
const props = defineProps({
  error: {
    type: [Object, Boolean],
    default: false
  }
})
if (props.error) {
  showError({
    statusCode: props.error.statusCode || 500,
    statusMessage: `${props.error.name} - ${props.error.message}`,
    stack: props.error.stackTrace
  })
}
</script>

<style></style>