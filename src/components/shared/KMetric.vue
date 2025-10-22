<template>
  <div class="metric">
    <span class="dot metric-dot" /> <span class="metric-value">{{ value }}</span>
    <span class="metric-label">{{ label }}</span>
  </div>
</template>
<script setup lang="ts">

defineProps<{
  value: number | string
  label: string
}>()
</script>

<style lang="scss" scoped>
.metric-dot {
    background-color: $kui-icon-color-success;
}

.metric-value {
    color: $kui-color-text;
    font-size: $kui-font-size-40;
    font-weight: $kui-font-weight-semibold;
    line-height: $kui-line-height-40;
}

.metric-label {
    color: $kui-color-text-neutral;
    font-size: $kui-font-size-40;
    font-weight: $kui-font-weight-regular;
    line-height: $kui-line-height-40;
    margin-left: $kui-space-20;
}
</style>