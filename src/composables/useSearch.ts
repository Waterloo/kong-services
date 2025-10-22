import { computed, watch, type Ref } from 'vue'
import type { Service } from '@/types/models/services'
import { addServicesToIndex, searchServices } from '@/services/search/services'

export interface UseSearchReturn {
  results: Ref<Service[]>
  isSearching: Ref<boolean>
}

/**
 * Search composable for services using the centralized search service
 * @param items - Ref containing the array of services to search through
 * @param query - Ref containing the search query string
 * @returns Filtered/searched results
 */
export function useSearch(
  items: Ref<Service[]>,
  query: Ref<string>,
): UseSearchReturn {
  // Update search index when items change
  watch(
    items,
    (newItems) => {
      if (newItems.length > 0) {
        addServicesToIndex(newItems)
      }
    },
    { immediate: true },
  )

  const isSearching = computed(() => !!query.value.trim())

  const results = computed(() => {
    const trimmedQuery = query.value.trim()

    // Return all items if no search query
    if (!trimmedQuery) {
      return items.value
    }

    // Use the centralized search service
    return searchServices(trimmedQuery)
  })

  return {
    results,
    isSearching,
  }
}
