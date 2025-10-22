<template>
  <div class="service-catalog">
    <div class="services-header">
      <div class="services-title">
        <h1 class="main-title">
          Service Hub
        </h1>
        <p class="sub-title">
          Organize services, manage and track versioning and API service documentation.
          <a
            class="learn-more"
            href="#"
          >
            Learn more
          </a>
        </p>
      </div>
      <div class="service-header-actions">
        <KInput
          v-model="servicesStore.searchQuery"
          class="search-input"
          data-testid="search-input"
          placeholder="Search"
        >
          <template #before>
            <SearchIcon />
          </template>
        </KInput>
        <KButton
          appearance="none"
          class="service-package-button"
          @click="handleServicePackageModalOpen()"
        >
          <AddIcon /> Service Package
        </KButton>
      </div>
    </div>

    <div
      v-if="servicesStore.loading"
      class="catalog"
    >
      <ServiceCardSkeleton
        v-for="n in 9"
        :key="n"
      />
    </div>

    <!-- Error State -->
    <div
      v-else-if="servicesStore.error"
      class="error-state"
      data-testid="error-state"
    >
      <KEmptyState
        icon-variant="error"
        message="Please try again or contact support if the problem persists."
        title="Failed to load services"
      >
        <template #action-button>
          <KButton @click="servicesStore.fetchServices()">
            Retry
          </KButton>
        </template>
      </KEmptyState>
    </div>

    <template v-else-if="servicesStore.filteredServices.length">
      <ul
        class="catalog"
      >
        <ServiceCard
          v-for="service in servicesStore.paginatedServices"
          :key="service.id"
          :service="service"
          @click="handleCardClick(service.id)"
        />
      </ul>
      <KPagination
        disable-page-jump
        hide-cancel-button
        :page-sizes="[
          PAGINATION_CONFIG.DEFAULT_PAGE_SIZE,
        ]"
        :total-count="servicesStore.totalCount"
        @page-change="onPageChange"
      />
    </template>
    <div
      v-else
      data-testid="no-results"
    >
      <KEmptyState
        action-button-text="Add Service"
        message="No services found"
        title="No services found"
      />
    </div>

    <ServiceDetailsModal
      :service="selectedService"
      :visible="detailsVisible"
      @close="closeModal"
    />

    <KModal
      action-button-text="Ok"
      hide-cancel-button
      title="Service Package"
      :visible="servicePackageModalVisible"
      @cancel="handleServicePackageModalClose"
      @proceed="handleServicePackageModalClose"
    >
      Soon you will be able to create service packages here.
    </KModal>
  </div>
</template>

<script setup lang="ts">
import { useServicesStore } from '@/stores/services'
import ServiceCard from '@/components/Service/ServiceCard.vue'
import ServiceCardSkeleton from '@/components/Service/ServiceCardSkeleton.vue'
import ServiceDetailsModal from '@/components/Service/ServiceDetailsModal.vue'
import type { PageChangeData } from '@kong/kongponents'
import { useRoute, useRouter } from 'vue-router'
import { watch, ref, onMounted, computed, defineOptions } from 'vue'
import { PAGINATION_CONFIG } from '@/config/pagination'
import { SearchIcon, AddIcon } from '@kong/icons'

defineOptions({ name: 'ServicesPage' })

const servicesStore = useServicesStore()

// Explicitly fetch services when component mounts
onMounted(() => {
  if (servicesStore.services.length === 0 && !servicesStore.loading) {
    servicesStore.fetchServices()
  }
})

function onPageChange(pageChangeEvent: PageChangeData) {
  servicesStore.setPage(pageChangeEvent.page)
}

const detailsVisible = ref(false)
const servicePackageModalVisible = ref(false)

const route = useRoute()
const router = useRouter()

// Get selected service based on route param
const selectedService = computed(() => {
  const serviceId = route.params.id as string
  if (!serviceId) return null
  return servicesStore.services.find(s => s.id === serviceId) || null
})

watch(() => (route.params.id), (id) => {
  if (id) {
    detailsVisible.value = true
  } else {
    detailsVisible.value = false
  }
}, { immediate: true })

// when a card is clicked, navigate to route with id param
function handleCardClick(id: string) {
  router.push({ name: 'ServiceDetails', params: { id } })
}

function closeModal() {
  router.push({ name: 'Services' })
}

function handleServicePackageModalOpen() {
  servicePackageModalVisible.value = true
}
function handleServicePackageModalClose() {
  servicePackageModalVisible.value = false
}

</script>


<style lang="scss" scoped>
.service-catalog {
  container-name: service;
  container-type: inline-size;
  margin: 2rem auto;
  padding: 0 20px;
}

.catalog {
  display: grid;
  gap: $kui-space-100;
  grid-template-columns: 1fr;
  padding: $kui-space-0;
}

// Redefine breakpoints for container queries
$phablet-width: $kui-breakpoint-phablet;
$tablet-width: $kui-breakpoint-tablet;

@container service (min-width: #{$phablet-width}) {
  .catalog {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container service (min-width: #{$tablet-width}) {
  .catalog {
    grid-template-columns: repeat(3, 1fr);
  }
}


.service {
  border: 1px solid #999;
  border-radius: 10px;
  margin: 6px;
  padding: 8px 16px;
  width: 200px;

  p:first-of-type {
    color: #333;
    font-weight: 700;
  }

  p {
    color: #666;
  }
}

input {
  padding: 8px 4px;
}

.main-title {
  color: $kui-color-text-neutral-stronger;
  margin: $kui-space-50 0;
}

.services-title {
  display: flex;
  flex-direction: column;
}

.sub-title {
  color: $kui-color-text-neutral;
  margin: 0;
}

.learn-more {
  color: $kui-color-text-primary;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.services-header {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: $kui-space-50;
}

$kui-color-background-primary: #07A88D;
.service-package-button {
  background-color: $kui-color-background-primary;
  border-radius: $kui-border-radius-round;
  color: $kui-color-text-inverse;
  padding: $kui-space-50 $kui-space-80;
  display: flex;
  gap: $kui-space-50;
  width: 100%;
  justify-content: center;
}

.service-header-actions {
  display: flex;
  flex-direction: column;
  gap: $kui-space-30;
  width: 100%;
}

.error-state {
  margin-top: $kui-space-100;
}

// Make the search input span full width on mobile
.search-input {
  width: 100%;
}

// At larger container sizes, switch back to a horizontal layout and auto widths
@container service (min-width: #{$phablet-width}) {
  .services-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .service-header-actions {
    flex-direction: row;
    width: auto;
  }

  .search-input {
    width: auto;
  }

  .service-package-button {
    width: auto;
    justify-content: center;
  }
}
</style>
