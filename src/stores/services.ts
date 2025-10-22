import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import type { Service } from '@/types/models/services'
import { getServices } from '@/services/api/services.api'
import { PAGINATION_CONFIG } from '@/config/pagination'
import { usePagination } from '@/composables/usePagination'
import { useSearch } from '@/composables/useSearch'

export const useServicesStore = defineStore('services', () => {

  // shallowRef for better performance with large versions arrays
  // we can think about making metrics reactive separately when realtime updates are introduced

  const services = shallowRef<Service[]>([])
  const loading = ref<boolean>(false)
  const error = ref<Error | null>(null)
  const searchQuery = ref<string>('')


  const { results: filteredServices } = useSearch(services, searchQuery)


  const {
    paginatedItems: paginatedServices,
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    setPage,
    resetPagination,
  } = usePagination<Service>(filteredServices, {
    pageSize: PAGINATION_CONFIG.DEFAULT_PAGE_SIZE,
  })

  async function fetchServices(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      services.value = await getServices()
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to fetch services')
      throw error.value
    } finally {
      loading.value = false
    }
  }

  function setSearchQuery(query: string): void {
    searchQuery.value = query
    // Reset to first page when search changes (composable handles this automatically)
    resetPagination()
  }

  function reset(): void {
    services.value = []
    loading.value = false
    error.value = null
    searchQuery.value = ''
    resetPagination()
  }

  return {

    services,
    loading,
    error,
    searchQuery,
    currentPage,
    pageSize,

    filteredServices,
    paginatedServices,
    totalCount,
    totalPages,

    fetchServices,
    setPage,
    setSearchQuery,
    resetPagination,
    reset,
  }
})
