<template>
  <KCard class="service-card-skeleton">
    <template #title>
      <div class="card-header">
        <div class="status-badge-skeleton">
          <KSkeletonBox
            height="1"
            width="5"
          />
        </div>
      </div>
    </template>

    <div class="card-content">
      <!-- Service title skeleton -->
      <div class="service-title-skeleton">
        <KSkeletonBox
          height="2"
          width="75"
        />
      </div>

      <!-- Service description skeleton -->
      <div class="service-description-skeleton">
        <KSkeletonBox
          height="1"
          width="100"
        />
        <KSkeletonBox
          height="1"
          width="100"
        />

        <KSkeletonBox
          height="1"
          width="75"
        />
      </div>

      <div class="additional-info">
        <!-- Metrics skeleton -->
        <div class="metrics">
          <div class="metric-row">
            <KSkeletonBox
              height="1"
              width="10"
            />
          </div>
          <div class="metric-row">
            <KSkeletonBox
              height="1"
              width="10"
            />
          </div>
          <div class="metric-row">
            <KSkeletonBox
              height="1"
              width="5"
            />
            <KSkeletonBox
              height="1"
              width="5"
            />
          </div>
        </div>

        <!-- Avatar skeleton -->
        <div class="service-avatars">
          <div class="avatar-skeleton">
            <KSkeletonBox />
          </div>
          <div class="avatar-skeleton">
            <KSkeletonBox />
          </div>
        </div>
      </div>
    </div>
  </KCard>
</template>

<script setup lang="ts">
import { KCard, KSkeletonBox } from '@kong/kongponents'
</script>

<style lang="scss" scoped>
.service-card-skeleton {
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
        padding-top: $kui-space-80;
    }
}

.card-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
}

.status-badge-skeleton {
    align-items: center;
    display: flex;
}

.card-content {
    display: flex;
    flex-direction: column;
}

.service-title-skeleton {
    margin-bottom: $kui-space-50;
    margin-top: $kui-space-0;
}

.service-description-skeleton {
    display: flex;
    flex-direction: column;
    gap: $kui-space-30;
    margin-bottom: $kui-space-70;
    margin-top: $kui-space-0;
}

.additional-info {
    align-items: center;
    display: flex;
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

.service-avatars {
    align-self: flex-end;
    display: flex;
    flex-shrink: 0;
    gap: $kui-space-20;
    margin-bottom: $kui-space-20;
}

.avatar-skeleton {
    :deep(.skeleton-box) {
        border-radius: $kui-border-radius-circle;
        height: $kui-space-100;
        width: $kui-space-100;
    }
}

@media (max-width: $kui-breakpoint-phablet) {
    .service-card-skeleton {
        :deep(.k-card-header),
        :deep(.k-card-body) {
            padding: $kui-space-70;
        }
    }

    .additional-info {
        align-items: flex-start;
        flex-direction: column;
        gap: $kui-space-70;
    }

    .service-avatars {
        align-self: flex-start;
    }
}
</style>