<template>
  <div
    class="avatar"
    :style="{ backgroundColor: bgColor }"
  >
    <img
      v-if="src"
      :alt="alt || 'Avatar'"
      :src="src"
    >
    <span v-else-if="label">{{ label || 'Avatar' }}</span>
  </div>
</template>

<script setup lang="ts">
import { KUI_COLOR_BACKGROUND_DISABLED } from '@kong/design-tokens'
defineProps({
  src: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  bgColor: {
    type: String,
    default: KUI_COLOR_BACKGROUND_DISABLED,
  },
})
</script>

<style scoped lang="scss">
.avatar {
  align-items: center;
  background: #eee;
  border: 4px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  color: #555;
  display: flex;
  font-size: 1.5rem;
  height: $kui-icon-size-60;
  justify-content: center;
  overflow: hidden;
  width: $kui-icon-size-60;
  z-index: 2;
}

.avatar img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}
</style>