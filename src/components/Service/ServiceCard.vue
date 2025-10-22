<template>
  <KCard
    :aria-label="`Open ${service.name}`"
    class="service-card"
    role="button"
    tabindex="0"
  >
    <template #title>
      <div class="card-header">
        <div class="status-badge">
          <component
            :is="statusConfig.icon"
            :color="statusConfig.color"
          />
          <span class="status-text">{{ statusConfig.text }}</span>
        </div>
        <KBadge appearance="info">
          {{ service.versions.length }} Versions
        </KBadge>
      </div>
    </template>

    <div class="card-content">
      <h1 class="service-title">
        {{ service.name }}
      </h1>
      <p class="service-description">
        {{ service.description }}
      </p>
    </div>

    <template #footer>
      <div
        v-if="service.configured"
        class="additional-info"
      >
        <div class="metrics">
          <div class="metric-row">
            <KMetric
              label="latency"
              :value="service.metrics?.latency ?? 0"
            />
          </div>
          <div class="metric-row">
            <KMetric
              label="uptime"
              :value="(service.metrics?.uptime.toFixed(2) ?? 0) + '%'"
            />
          </div>
          <div class="metric-row">
            <KMetric
              label="requests"
              :value="formatCompactNumber(service.metrics?.requests ?? 0)"
            />

            <KMetric
              label="errors"
              :value="(service.metrics?.errors?.toFixed(2) ?? 0) + '%'"
            />
          </div>
        </div>
        <div class="service-avatars">
          <KAvatar
            v-for="avatar in avatars"
            v-bind="avatar"
            :key="avatar.key"
          />
        </div>
      </div>

      <div
        v-else
        class="not-configured-message"
      >
        <span class="message-text"><span class="dot" /> Not configured with runtime yet</span>
      </div>
    </template>
  </KCard>
</template>

<script setup lang="ts">
import { KCard, KBadge } from '@kong/kongponents'
import KMetric from '../shared/KMetric.vue'
import type { Service } from '@/types/models/services'
import { computed } from 'vue'
import { getStatusConfig } from '@/utils/services'
import KAvatar from '../shared/KAvatar.vue'
import { formatCompactNumber } from '@/utils/number'

interface Props {
  service: Service
}

const props = defineProps<Props>()

const statusConfig = computed(() =>
  getStatusConfig(props.service.published, props.service.configured),
)

const avatars = computed(() => {
  const avatars = [...new Set(
    props.service.versions
      .map(v => v.developer?.avatar)
      .filter(Boolean),
  )]

  return avatars.length <= 2
    ? avatars.map(src => ({ src, key: src }))
    : [
      { label: `+${avatars.length - 2}`, key: 'more-avatars' },
      ...avatars.slice(0, 2).map(src => ({ src, key: src })),
    ]
})
</script>

<style lang="scss" scoped>


.service-card {
  border: none;
  border-radius: $kui-border-radius-10;
  gap: $kui-space-50;
  max-width: 880px;
  width: 100%;

  :deep(.k-card-header) {
    padding: $kui-space-80;
    padding-bottom: 0;
  }

  :deep(.k-card-body) {
    padding: $kui-space-80;
    padding-bottom: 0;
    padding-top: $kui-space-80;
  }

  :deep(.k-card-actions) {
    border-top: $kui-border-width-10 solid $kui-color-border;
    padding: $kui-space-80;
    padding-top: $kui-space-60;
  }
}

.card-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.status-badge {
  align-items: center;
  color: $kui-color-text-neutral-strong;
  display: flex;
  font-size: $kui-font-size-30;
  font-weight: $kui-font-weight-regular;
  gap: $kui-space-40;
  line-height: $kui-line-height-30;
}

.status-text {
  color: $kui-color-text-neutral-strong;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.service-title {
  color: $kui-color-text-neutral-stronger;
  font-family: $kui-font-family-heading;
  font-size: $kui-font-size-70;
  font-weight: $kui-font-weight-semibold;
  letter-spacing: $kui-letter-spacing-minus-40;
  line-height: $kui-line-height-70;
  margin-bottom: $kui-space-50;
  margin-top: $kui-space-0;
}

.service-description {
  color: $kui-color-text-neutral;
  font-size: $kui-font-size-40;
  font-weight: $kui-font-weight-regular;
  line-height: $kui-line-height-40;
  margin-top: $kui-space-0;
}

.additional-info {
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
}

.metrics {
  display: flex;
  flex-direction: column;
  gap: $kui-space-40;
}

.metric-row {
  align-items: center;
  display: flex;
  gap: $kui-space-30;
}



.metric-separator {
  color: $kui-color-text-neutral;
  margin: 0 $kui-space-40;
}

.service-avatar {
  border-radius: $kui-border-radius-circle;
  height: $kui-space-100;
  width: $kui-space-100;
}

.service-avatars {
  align-self: flex-end;
  display: flex;
  flex-shrink: 0;
  margin-bottom: $kui-space-20;
  margin-left: -$kui-space-100;
}

.service-avatars :deep(.avatar:not(:first-child)){
  margin-left:-$kui-space-50;
  z-index: 1;
}

.not-configured-message {
  align-items: center;
  display: flex;
}

.message-text {
  color: $kui-color-text-neutral;
  font-size: $kui-font-size-30;
  font-weight: $kui-font-weight-regular;
  line-height: $kui-line-height-30;
}

@media (max-width: $kui-breakpoint-phablet) {
  .service-card {
    :deep(.k-card-header),
    :deep(.k-card-body),
    :deep(.k-card-actions) {
      padding: $kui-space-70;
    }

    :deep(.k-card-body) {
      padding-bottom: 0;
    }

    :deep(.k-card-actions) {
      padding-top: $kui-space-60;
    }
  }

  .service-title {
    font-size: $kui-font-size-80;
    line-height: $kui-line-height-80;
  }

  .additional-info {
    align-items: flex-start;
    flex-direction: column;
    gap: $kui-space-70;
  }
}

.metric-dot {
  background-color: $kui-icon-color-success;
  border-radius: $kui-border-radius-circle;
  display: inline-block;
  flex-shrink: 0;
  height: 8px;
  width: 8px;
}
</style>