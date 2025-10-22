<template>
  <KModal
    :action-button-text="actionButtonText"
    hide-cancel-button
    max-width="800px"
    :title="service?.name || 'Service Details'"
    :visible="visible"
    @cancel="handleClose"
    @proceed="handleClose"
  >
    <div
      v-if="service"
      class="service-details"
    >
      <!-- Service Description -->
      <div
        v-if="service.description"
        class="service-section"
      >
        <p
          class="service-description"
        >
          {{ service.description }}
        </p>
      </div>

      <!-- Versions Section -->
      <div class="versions-section">
        <h2 class="section-title">
          Versions ({{ service.versions.length }})
        </h2>

        <ul class="versions-list">
          <li
            v-for="version in service.versions"
            :key="version.id"
            class="version-item"
          >
            <div class="version-number">
              {{ version.name }}
            </div>

            <p class="version-description">
              {{ version.description }}
            </p>

            <div class="version-badges">
              <KBadge
                appearance="info"
                class="badge badge-http"
              >
                HTTP
              </KBadge>
              <KBadge
                appearance="info"
                class="badge badge-rest"
              >
                REST
              </KBadge>
            </div>

            <div class="version-developer">
              <KAvatar
                :alt="version.developer.name"
                :src="version.developer.avatar"
              />
              <div class="developer-info">
                <p class="developer-name">
                  {{ version.developer.name }}
                </p>
                <p class="version-date">
                  {{ formatDate(version.updated_at) }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </KModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Service } from '@/types/models/services'
import KAvatar from '@/components/shared/KAvatar.vue'
import { formatRelativeTime } from '@/utils/datetime'

interface Props {
  service: Service | null
  visible: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const actionButtonText = computed(() => {
  return props.service ? 'Close' : 'Ok'
})

function handleClose() {
  emit('close')
}

function formatDate(date: string): string {
  return formatRelativeTime(date)
}
</script>

<style lang="scss" scoped>
.service-details {
  padding: $kui-space-0;
}

.service-section {
  margin-bottom: $kui-space-80;
}

.service-description {
  color: $kui-color-text-neutral;
  font-size: $kui-font-size-40;
  line-height: $kui-line-height-40;
  margin: $kui-space-0;
}

.versions-section {
  margin-top: $kui-space-80;
}

.section-title {
  color: $kui-color-text-neutral-stronger;
  font-family: $kui-font-family-heading;
  font-size: $kui-font-size-60;
  font-weight: $kui-font-weight-semibold;
  line-height: $kui-line-height-60;
  margin-bottom: $kui-space-60;
  margin-top: $kui-space-0;
}

.versions-list {
  list-style: none;
  margin: $kui-space-0;
  padding: $kui-space-0;
}

.version-item {
  align-items: center;
  border-bottom: $kui-border-width-10 solid $kui-color-border;
  display: grid;
  gap: $kui-space-60;
  grid-template-columns: 120px 1fr auto auto;
  padding: $kui-space-60 $kui-space-0;

  &:last-child {
    border-bottom: none;
  }
}

.version-number {
  color: $kui-color-text-neutral-stronger;
  font-size: $kui-font-size-50;
  font-weight: $kui-font-weight-semibold;
  line-height: $kui-line-height-50;
}

.version-description {
  color: $kui-color-text-neutral;
  font-size: $kui-font-size-30;
  line-height: $kui-line-height-40;
  margin: $kui-space-0;
}

.version-badges {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: $kui-space-40;
}

.badge {
  font-size: $kui-font-size-20;
  font-weight: $kui-font-weight-medium;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.version-developer {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: $kui-space-40;
}

.developer-info {
  display: flex;
  flex-direction: column;
  gap: $kui-space-20;
  min-width: 120px;
}

.developer-name {
  color: $kui-color-text-neutral-stronger;
  font-size: $kui-font-size-30;
  font-weight: $kui-font-weight-semibold;
  line-height: $kui-line-height-30;
  margin: $kui-space-0;
}

.version-date {
  color: $kui-color-text-neutral;
  font-size: $kui-font-size-20;
  line-height: $kui-line-height-20;
  margin: $kui-space-0;
}

@media (max-width: $kui-breakpoint-phablet) {
  .version-item {
    gap: $kui-space-50;
    grid-template-columns: 1fr;
  }

  .version-number {
    font-size: $kui-font-size-40;
  }
}
</style>
